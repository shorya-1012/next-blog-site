import Link from "next/link";
import Image from "next/image";

export default function Card(props) {

    return (
        <div className="hover:-translate-y-3 bg-[#212121] duration-500 card-body rounded-2xl mx-auto my-4 md:m-4 w-[270px] h-[440px] shadow-md shadow-slate-800">
            <div className="image-holder relative overflow-hidden h-[198px] w-[270px] rounded-2xl">
                <Image src={props.details.imageURL} alt='img' fill={true} style={{ objectFit: "cover" }} />
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