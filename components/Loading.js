import { CgSpinner } from 'react-icons/cg'

export default function Loading() {
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const quotes = [
        "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",

        "Education is the kindling of a flame, not the filling of a vessel.",

        "The beautiful thing about learning is that no one can take it away from you.",

        "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",

        "Learning never exhausts the mind.",

        "The only true wisdom is in knowing you know nothing.",

        "Education is not the filling of a pail, but the lighting of a fire.",

        "If you think education is expensive, try ignorance."
    ]

    let index = getRndInteger(0, quotes.length)

    return (
        <div suppressHydrationWarning={true} className="w-screen h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center">
            <CgSpinner className='h-20 w-20 animate-spin' />
            <h1 className='text-2xl my-3 font-righteous'>Loading</h1>
            <div className='w-[70%] text-center mt-5'>
                <h2 suppressHydrationWarning={true} className='text-md md:text-lg font-righteous '>{'"' + quotes[index] + '"'}</h2>
            </div>
        </div>
    )
}