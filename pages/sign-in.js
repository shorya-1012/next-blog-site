import { SignIn, } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div
            className="max-w-[100vw] h-[100vh] bg-[#002233] flex justify-center items-center bg-cover bg-center">
            <div className="w-full md:w-[90%] md:h-[490px] lg:w-[70%] lg:h-[80%] flex items-center justify-center shadow-2xl rounded-2xl bg-white">
                <SignIn />
                <div style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-2242.jpg?w=740&t=st=1682435077~exp=1682435677~hmac=3861b26cb9ce74a1a792d44ed73565f22f7b66880a5f3c719fa4b59936f939db)' }}
                    className="hidden md:block w-[40%] h-[80%] lg:w-[40%] lg:h-[100%] max-h-[452px] bg-center bg-cover"></div>
            </div>
        </div>
    )
}