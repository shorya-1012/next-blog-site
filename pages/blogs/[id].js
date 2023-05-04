import NavBar from "@/components/Navbar"
import { supabase } from "@/lib/supabaseClient"
import Footer from "@/components/Footer";

export default function BlogPage({ blog }) {
    const timestamp = blog.created_at
    const date = timestamp.substr(0, timestamp.indexOf("T"));

    return (
        <div className="flex flex-col overflow-x-hidden mb-5 pb-5">
            <NavBar />
            <div className="mt-8">
                <h1 className="text-center text-2xl font-semibold">{blog.title}</h1>
            </div>
            <div className="max-w-[1400px] w-full h-[220px] md:h-[340px] lg:h-[470px] mx-auto relative py-5 md:px-10 px-5 group ">
                <div style={{ backgroundImage: `url(${blog.imageURL})` }} className="w-full h-full rounded-2xl bg-center bg-cover "></div>
            </div>
            <div className="m-2 px-4 md:px-9">
                <p className="text-lg text-gray-500 font-medium">Published on : {date}</p>
            </div>
            <div className="m-2 px-4 md:px-9 mb-10 pb-10">
                <p>{blog.content}</p>
            </div>
            <div className="w-screen mt-auto">
                <Footer />
            </div>
        </div>
    )
}


export async function getStaticPaths() {

    let { data } = await supabase.from('blogs').select()

    const paths = data.map((post) => ({
        // params: { slug: post.title.replace(/\s/g, '') },
        params: { id: post.id }
    }))


    return { paths, fallback: 'blocking' }

}

export async function getStaticProps({ params }) {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', params.id)
        .single()

    data.imageURL = await getImages(data.id)

    return { props: { blog: data }, revalidate: 100 }

}

async function getImages(id) {
    const { data, error } = await supabase
        .storage
        .from('blog-images')
        .list(id, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
        })
    if (data !== null) {
        const imageURL = "https://owrwsajksrwgdfssrskn.supabase.co/storage/v1/object/public/blog-images/" + id + '/' + data[0].name

        return imageURL
    }
}

