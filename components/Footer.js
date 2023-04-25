import Link from "next/link"

export default function Footer() {
    return (
        <div className="mt-10 justify-self-end">
            <div className="w-full h-[1px] bg-gray-400 "></div>
            <footer className="max-w-[100vw] flex justify-between items-center py-3">
                <div className="logo-container ms-2 mt-5 md:ms-5">
                    <p className="text-gray-500">&copy; Uncharted Musings @2023</p>
                </div>
                <div className="button-container w-[30%] mt-5 md:w-[20%]">
                    <ul className="flex justify-around text-gray-500">
                        <li className='md:my-0 '><Link href={'/'} >Home</Link></li>
                        <li className='md:my-0 '><Link href={'/about'}>Abou</Link>t</li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}