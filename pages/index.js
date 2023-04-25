import NavBar from "@/components/Navbar";
import Slides from "@/components/home-page-ui/Slides";
import Card from "@/components/home-page-ui/Card";
import { supabase } from "@/lib/supabaseClient";
import Footer from "@/components/Footer";

export default function Home({ blogs }) {


  let featuredBlogs = []

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].featured) {
      featuredBlogs.push(blogs[i])
    }
  }

  return (
    < div className="overflow-x-hidden" >
      <NavBar />
      <Slides blogs={featuredBlogs} />
      <div className="max-w-[1440px] mx-auto flex justify-between w-full h-auto">
        <div className="cards-holder w-full md:w-[80%] h-auto py-5 px-5 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 ">
          {
            blogs.map(blog => {
              return (<Card key={blog.id} details={blog} />)
            })
          }
        </div>
        <div className="w-[20%] mt-10 hidden md:flex md:flex-col md:items-center ">
          <div className="w-[80%] h-[1px] bg-black"></div>
          <h4 className="text-xl text-center my-1">ABOUT THE AUTHOR</h4>
          <div className="w-[80%] h-[1px] bg-black"></div>
          <p className="text-center w-[80%] my-3">This blog site was made by Shorya Jain</p>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export async function getServerSideProps() {

  let { data } = await supabase.from('blogs').select()

  const blogsData = await Promise.all(data.map(async (blog) => {

    const { data, error } = await supabase
      .storage
      .from('blog-images')
      .list(blog.id, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      })
    if (data !== null) {
      const imageURL = "https://owrwsajksrwgdfssrskn.supabase.co/storage/v1/object/public/blog-images/" + blog.id + '/' + data[0].name
      return { ...blog, imageURL }
    } else {
      console.log(error)
    }
  }))

  return {
    props: {
      blogs: blogsData
    }
  }
}
