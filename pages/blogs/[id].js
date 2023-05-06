import NavBar from "@/components/Navbar"
import { supabase } from "@/lib/supabaseClient"
import Footer from "@/components/Footer";

export default function BlogPage({ blog }) {

    if (blog.notFound) {
        return (
            <div className="flex flex-col h-[90vh] justify-center items-center">
                <h1 className="text-3xl mb-5">Error : 404 </h1>
                <h2 className="text-xl">Page not found</h2>
            </div>
        )
    }

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


export async function getServerSideProps(context) {

    const id = context.params.id

    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single()

    if (data) {
        data.imageURL = await getImages(data.id)
        data.notFound = false
    }
    else {
        return { props: { blog: { notFound: true } } }
    }

    return { props: { blog: data } }

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

