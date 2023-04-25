import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'
import { FcReadingEbook } from 'react-icons/fc'
import { MdOutlineClose } from 'react-icons/md'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function NavBar() {

    // toggle -> true -> open menu
    // toggle -> false -> close 
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(() => !toggle);
    }

    const css = {
        visibility: toggle ? 'top-[8%]' : 'top-[-100%]',
    }

    return (
        <header className='max-w-[100vw] h-[60px] md:shadow-lg '>
            <nav className='flex flex-col md:flex-row justify-between w-[100%] h-[100%]'>
                <div className='logo-container md:mt-0 mt-3 flex w-[100%] h-[100%] items-center ml-5'>
                    <div className='logo-img mr-2'>
                        <FcReadingEbook size={'40px'} />
                    </div>
                    <span className='md:text-2xl text-xl font-lobster '>Uncharted Musings</span>
                </div>
                <button className='md:hidden absolute right-4 top-6' onClick={handleToggle} >
                    {toggle ? <MdOutlineClose size={'25px'} /> : <GiHamburgerMenu size={'22px'} />}
                </button>
                <div className='md:hidden absolute right-14 top-5 '>
                    <SignedOut>
                        <Link href={'/sign-in'}>
                            <div className='h-max w-max px-2 py-2  text-white text-sm rounded-xl bg-blue-500 duration-75 md:my-0'>Sign In</div>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
                <div className={`w-full md:w-[38%] z-20 bg-white absolute md:static ${css.visibility} md:ml-3 md:shadow-none shadow-2xl`}>
                    <ul className={`h-[100%] w-[100vw] md:w-auto flex flex-col md:flex-row justify-around items-center`}>
                        <li className='hover:font-semibold duration-75 md:my-0 mt-7'><Link href={'/'} >Home</Link></li>
                        <li className='hover:font-semibold duration-75 md:my-0 my-7'><Link href={'/about'}>About</Link></li>
                        <div className='hidden md:block'>
                            <SignedOut>
                                <li className='hover:font-semibold duration-75 md:my-0'><Link href={'/sign-in'}>Sign In</Link></li>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </ul>
                </div>
            </nav >
        </header >
    );
}