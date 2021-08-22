import { useRouter } from 'next/router'


const EditButton = ({id}) => {
    const router = useRouter()

    const clickHandler = () =>{
        router.push(`/notes/${id}/edit`)
    }

    return (
        <button onClick={()=>clickHandler()} className = " fixed z-10 bg-indigo-700 hover:bg-indigo-500 transition text-white w-16 h-16 md:w-20 md:h-20  border-none cursor-pointer rounded-full bottom-4 right-4 md:bottom-12 md:right-12" >
            <svg className ="fill-current text-white w-6 h-6 md:w-8 md:h-8 ml-5 md:ml-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.947 383.947">
                <path d="M0 303.947v80h80l236.053-236.054-80-80zM377.707 56.053L327.893 6.24c-8.32-8.32-21.867-8.32-30.187 0l-39.04 39.04 80 80 39.04-39.04c8.321-8.32 8.321-21.867.001-30.187z"/>
            </svg>
        </button>
    );
}

export default EditButton;