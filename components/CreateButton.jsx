import { useRouter } from "next/router";

const CreateButton = () => {
    const router = useRouter();
    return (
        <button onClick={() => router.push('/memo/create')}className = " fixed z-10 bg-indigo-700 hover:bg-indigo-500 transition text-white w-16 h-16 md:w-20 md:h-20 border-none cursor-pointer rounded-full bottom-4 right-4 md:bottom-12 md:right-12" >
            <div className = " text-4xl mb-1 text-bold py-1 md:text-7xl md:py-0" > + </div> 
        </button>
    );
}

export default CreateButton;