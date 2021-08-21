import { useRouter } from 'next/router'


const DoneButton = ({id}) => {
    const router = useRouter()


    return (
        <button className = " fixed z-10 bg-indigo-700 hover:bg-indigo-500 transition text-white w-16 h-16 border-none cursor-pointer rounded-full bottom-4 right-4 md:bottom-10 md:right-10" >
            <svg className = "fill-current text-white h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.296 32.296">
                <path d="M31.923 9.14L13.417 27.642a1.27 1.27 0 01-1.793 0L.37 16.316a1.272 1.272 0 010-1.795l2.689-2.687a1.268 1.268 0 011.793 0l7.678 7.729L27.438 4.654a1.272 1.272 0 011.795 0l2.689 2.691c.499.495.499 1.301.001 1.795z" fill="#030104"/>
            </svg>
        </button>
    );
}

export default DoneButtons;