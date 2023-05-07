import NavBar from "@/components/Navbar"
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { supabaseClient } from "@/lib/supabaseClient"
import Image from "next/image";

export default function BlogPage({ data }) {

    const { userId, getToken } = useAuth()

    const [blogDetails, setBlogDetails] = useState({})
    const [loading, setLoading] = useState(true)

    const [comment, setComment] = useState("")

    function handleUserInput(event) {
        setComment(event.target.value)
    }

    useEffect(() => {
        const loadBlogDetails = async () => {
            const token = await getToken({ template: "supabase" })
            const blogDetails = await getBlogDetails(token, userId, data.users, data.id)
            setBlogDetails(blogDetails)
            setLoading(false)
        }
        loadBlogDetails()
    }, [userId])

    async function handleSubmit(event) {
        event.preventDefault()
        const token = await getToken({ template: "supabase" })
        const c = await addComment(blogDetails.user, blogDetails.id, token, comment)
        setComment("")
        const details = await getBlogDetails(token, userId, data.users, data.id)
        setBlogDetails(details)
    }


    if (loading) {
        return (
            <Loading />
        )
    }

    else if (blogDetails.notFound) {
        return (
            <div className="flex flex-col h-[90vh] justify-center items-center">
                <h1 className="text-3xl mb-5">Error : 404 </h1>
                <h2 className="text-xl">Page not found</h2>
            </div>
        )
    }
    else {

        const timestamp = blogDetails.created_at
        const date = timestamp.substr(0, timestamp.indexOf("T"));

        return (
            <div className="flex flex-col bg-[#0f0f0f] text-white overflow-x-hidden mb-5 pb-5">
                <NavBar />
                <div className="mt-8">
                    <h1 className="text-center text-2xl font-semibold">{blogDetails.title}</h1>
                </div>
                <div className="max-w-[1400px] w-full h-[220px] md:h-[340px] lg:h-[470px] mx-auto relative py-5 md:px-10 px-5 group ">
                    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-center bg-cover ">
                        <Image src={blogDetails.imageURL} alt="slide-img" fill={true} style={{ objectFit: "cover" }} />
                    </div>
                </div>
                <div className="m-2 px-4 md:px-9">
                    <p className="text-lg text-gray-400 font-medium">Published on : {date}</p>
                </div>
                <div className="m-2 px-4 md:px-9 mb-10 pb-10">
                    <p>{blogDetails.content}</p>
                </div>

                {/* comment section */}
                <div className="w-[90vw] bg-[#212121] mx-auto rounded shadow-2xl py-5 px-5">
                    <div className="form-holder h-[300px]">
                        <h2 className="text-xl sm:text-2xl my-4 ms-2">Add a Comment</h2>
                        <form onSubmit={handleSubmit} className="w-full md:w-[80%]">
                            <textarea
                                onChange={handleUserInput}
                                value={comment}
                                placeholder="Share your thoughts..."
                                className="w-full h-[100px] md:h-[120px] bg-[#383737] rounded-2xl shadow-2xl px-3 py-5 my-3" />
                            <button
                                className="hover:bg-white hover:text-black ms-2 rounded border-white text-white px-2 py-1 border-[1px]">Submit</button>
                        </form>
                    </div>
                    {blogDetails.comments.map(comment => {
                        return (
                            <div className="flex flex-col w-screen mb-8">
                                <div className="flex h-full w-full items-center">
                                    <div className="w-[45px] shrink-0 h-[45px] relative rounded-[50%] overflow-hidden mr-3">
                                        <Image src={comment.profileImageURL} alt='pfp' fill={true} />
                                    </div>
                                    <p className="text-lg w-full font-semibold mb-1">{comment.username}</p>
                                </div>
                                <div className="w-full ms-14">
                                    <div className="w-[60%] md:w-[70%]">
                                        <p>{comment.comment}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="w-screen mt-auto">
                    <Footer />
                </div>
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    const users = await clerkClient.users.getUserList();

    const id = context.params.id

    const data = {
        "users": JSON.stringify(users),
        "id": id
    }
    return { props: { data } }

}

async function getBlogDetails(token, userId, users, id) {
    const supabase = await supabaseClient(token)

    const currUser = getCurrUser(users, userId)

    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single()

    if (data) {
        data.imageURL = await getImages(supabase, data.id)
        data.notFound = false
        data.user = currUser
        data.comments = await getComments(supabase, data.id)
    }
    else {
        return { notFound: true }
    }

    return data
}

function getCurrUser(users, userId) {
    if (userId) {
        const usersList = JSON.parse(users)

        for (let i = 0; i < usersList.length; i++) {
            if (userId == usersList[i].id) {
                return usersList[i]
            }
        }
    }
}

async function getImages(supabase, id) {
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

async function getComments(supabase, id) {

    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('blog_id', id)

    if (error) {
        console.log(error)
    }
    return data
}

async function addComment(user, id, token, comment) {

    const supabase = await supabaseClient(token)

    if (comment === "") {
        alert("Can't add empty comment")
        return
    }
    const { error } = await supabase.from("comments").insert({
        blog_id: id,
        comment: comment,
        username: user.firstName + " " + user.lastName,
        profileImageURL: user.profileImageUrl
    })
    if (error) {
        console.log(error)
    }
}


// export async function getServerSideProps(context) {

    // const users = await clerkClient.users.getUserList();

    // const id = context.params.id

//     const { data, error } = await supabase
//         .from('blogs')
//         .select('*')
//         .eq('id', id)
//         .single()

//     if (data) {
//         data.imageURL = await getImages(data.id)
//         data.notFound = false
//         data.users = JSON.stringify(users)
//     }
//     else {
//         return { props: { blog: { notFound: true } } }
//     }

//     return { props: { blog: data } }

// }