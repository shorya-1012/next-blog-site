import { useEffect, useState } from 'react'
import Link from 'next/link';

export default function slides(props) {

    const [currSlide, setCurrSLide] = useState(0);

    function nextSlide() {
        setCurrSLide(prevSlide => prevSlide === props.blogs.length - 1 ? 0 : prevSlide + 1)
    }


    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 4000);
        return () => clearInterval(slideInterval);
    }, [])

    return (
        <div className="max-w-[1400px] w-full h-[420px] mx-auto relative z-10 py-5 md:px-10 px-5 group ">
            <Link href={'/blogs/' + props.blogs[currSlide].id}>
                <div style={{ backgroundImage: `url(${props.blogs[currSlide].imageURL})` }} className="slide-image w-full h-full rounded-2xl bg-center bg-cover duration-700 mix-blend-overlay"></div>

                <div className='absolute top-[75%] pr-4 text-2xl text-white w-full '>
                    <h2 className='text-center font-semibold duration-700 '>{props.blogs[currSlide].title}</h2>
                </div>
            </Link>
        </div >
    )
}
