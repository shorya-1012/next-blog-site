import Link from "next/link";

export default function Card(props) {

    return (
        <div className="hover:-translate-y-3 duration-500 card-body rounded-2xl mx-auto my-4 md:m-4 w-[270px] h-[440px] shadow-2xl">
            <div className="image-holder h-[45%]">
                <img
                    className="w-full h-full object-cover rounded-2xl shadow-inner"
                    src={props.details.imageURL} alt="pic" />
            </div>
            <Link href={'/blogs/' + props.details.id}>
                <div className="flex flex-col items-start mt-2 py-2 px-3 cursor-pointer">
                    <h5 className="text-xl text font-semibold mb-3">{props.details.title}</h5>
                    <p className="pb-3">{props.details.shortDesc}</p>
                </div>
            </Link>
        </div >
    );
}