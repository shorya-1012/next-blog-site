import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function AboutPage() {

    useEffect(() => {
        Aos.init({
            duration: 1800,
            offset: 0
        })
    }, [])

    return (
        <div className="overflow-x-hidden bg-[#0f0f0f] text-white">
            <NavBar />
            <div className=" flex flex-col md:flex-row md:justify-around items-center w-screen h-[90vh] ">
                <div className="flex flex-col items-center mt-8 md:mt-0 w-full md:w-[50%]">
                    <div data-aos="fade-down" className="mb-10 mt-5 pt-5">
                        <h1 className="text-2xl md:text-3xl font-lobster font-semibold">READ , LEARN , GROW</h1>
                    </div>
                    <div data-aos="fade-up" className="mx-2">
                        <p className="font-medium text-center">"The more that you read, the more things you will know. The more that you learn , the more places you'll go"</p>
                    </div>
                </div>
                <div data-aos="fade-left" className="w-[300px] h-[300px] mt-10 md:mt-0 md:w-[500px] md:h-[500px]">
                    <img className="w-full h-full object-cover" src="https://img.freepik.com/free-vector/online-article-concept-illustration_114360-5432.jpg?size=626&ext=jpg&ga=GA1.1.1128574845.1682269296&semt=sph" />
                </div>
            </div>
            <div className=" flex flex-col md:flex-row md:justify-around items-center w-screen h-[90vh] ">
                <div data-aos="fade-right" className="w-[300px] h-[300px] mt-5 md:mt-0 md:w-[500px] md:h-[500px]">
                    <img className="w-full h-full object-cover" src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg?size=626&ext=jpg&ga=GA1.1.1128574845.1682269296&semt=sph" />
                </div>
                <div className="flex flex-col items-center mt-8 md:mt-0 w-full md:w-[50%]">
                    <div data-aos="fade-down" className="mb-6 mt-3 pt-1">
                        <h1 className="text-2xl md:text-3xl font-lobster font-semibold ">ABOUT THE AUTHOR</h1>
                    </div>
                    <div data-aos="fade-up" className="mx-2">
                        <p className="font-medium text-center">This Blog Site was made by Shorya Jain</p>
                    </div>
                </div>
            </div>
            <div className="w-screen h-[90vh]  flex flex-col items-center justify-center">
                <div data-aos="fade-down" className="mb-10">
                    <h2 className="text-2xl font-lobster font-semibold">HOW IT WAS MADE</h2>
                </div>
                <div data-aos="fade-in" className="md:text-lg text-center mx-3 mb-10">
                    <p>This Blog Site was made using Next Js , Javascript and Tailwind CSS</p>
                    <p>Next.js is an open-source web development framework created by the private company Vercel</p>
                    <p>Tailwind CSS is an open source CSS framework</p>
                </div>
                <div className="w-full flex justify-center flex-wrap my-5">
                    <div data-aos="fade-right" className="w-[110px] h-[120px] md:w-[130px] md:h-[140px] flex flex-col justify-center items-center rounded-xl bg-[#24292f] mx-3 md:mx-5">
                        <div className="w-[60%] h-[50%] shadow-2xl">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <p className="text-center text-white font-medium mt-3">Javascript</p>
                    </div>
                    <div data-aos="fade-up" className="w-[110px] h-[120px] md:w-[130px] md:h-[140px] flex flex-col justify-center items-center rounded-xl bg-[#24292f] md:mx-5">
                        <div className="w-[60%] h-[55%] shadow-2xl">
                            <img src="https://d2nir1j4sou8ez.cloudfront.net/wp-content/uploads/2021/12/nextjs-boilerplate-logo.png" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <p className="text-center text-white font-medium mt-3">Next JS</p>
                    </div>
                    <div data-aos="fade-left" className="w-[110px] h-[120px] md:w-[130px] md:h-[140px] flex flex-col justify-center items-center rounded-xl bg-[#24292f] mx-2 md:mx-5">
                        <div className="w-[60%] h-[50%] shadow-2xl">
                            <img src="https://shadowblood.gallerycdn.vsassets.io/extensions/shadowblood/tailwind-moon/3.0.2/1673948732518/Microsoft.VisualStudio.Services.Icons.Default" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <p className="text-center text-white font-medium mt-3">Tailwind CSS</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}