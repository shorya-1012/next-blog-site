import { SignIn, } from "@clerk/nextjs";
import { FcReadingEbook } from "react-icons/fc";

export default function SignInPage() {
    return (
        <div
            style={{ backgroundImage: 'url(https://cdn.wallpapersafari.com/97/98/QSIzyL.jpg)' }}
            className="bg-cover bg-centeri h-[100vh] overflow-x-hidden" >
            <header className='max-w-[100vw] text-neutral-100 h-[60px] '>
                <nav className='flex flex-col md:flex-row justify-between w-[100%] h-[100%]'>
                    <div className='logo-container flex w-[100%] h-[100%] items-center ml-5'>
                        <div className='logo-img mr-2 bg-neutral-100 p-1 rounded-[50%]'>
                            <FcReadingEbook size={'40px'} />
                        </div>
                        <span className='md:text-2xl text-xl font-lobster '>Uncharted Musings</span>
                    </div>
                </nav >
            </header >
            <div className="max-w-[100vw] mt-5 sm:mt-0 h-[80vh] flex flex-col items-center justify-center bg-cover bg-center ">
                <div className="text-center mb-3">
                    <h1 className=" text-4xl font-righteous ">Welcome</h1>
                    <h2 className="text-2xl font-righteous text-white">Sign in to continue</h2>
                </div>
                <div className="">
                    <SignIn />
                </div>
            </div>
        </div>
    )
}