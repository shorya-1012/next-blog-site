import NavBar from "@/components/Navbar";
import Slides from "@/components/home-page-ui/Slides";
import Card from "@/components/home-page-ui/Card";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { supabaseClient } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";

export default function Home() {

  const { userId, getToken } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      const token = await getToken({ template: "supabase" })
      const blogs = await getBLogs(token)
      setBlogs(blogs)
      setLoading(false)
    }
    if (userId) {
      loadBlogs();
    }
  }, [userId])

  let featuredBlogs = []

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].featured) {
      featuredBlogs.push(blogs[i])
    }
  }

  if (userId === null) {
    return (
      <RedirectToSignIn />
    )
  }

  else if (loadingBlogs) {
    return (
      <Loading />
    )
  }
  else {
    return (
      < div className="overflow-x-hidden bg-[#0f0f0f] text-white" >
        <NavBar />
        <Slides blogs={featuredBlogs} />
        <div className="max-w-[1440px] mx-auto flex justify-center w-full h-auto">
          <div className="cards-holder w-full md:w-[80%] h-auto py-5 px-5 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 ">
            {
              blogs.map(blog => {
                return (<Card key={blog.id} details={blog} />)
              })
            }
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}


async function getBLogs(token) {

  const supabase = await supabaseClient(token)

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

  return blogsData;
}
