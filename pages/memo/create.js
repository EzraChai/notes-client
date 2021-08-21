import Head from "next/head";
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import { useEffect,useState } from 'react';


export default function Create(){
    const router = useRouter();
    const cookie = Cookies.get('token')
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')

    useEffect(() => {
        if (!cookie) {
          router.push('/')
        }
      }, [cookie])

    const handleDescription = e => {
        e.preventDefault()
        if(e.key === 'Enter'){
            setDescription(...description , '\n')
        } 
        setDescription(e.target.value)
    }

    const handleSubmitForm = async e => {
        e.preventDefault()
        if(title.trim() !== '' && description.trim() !== ''){
            const data ={ todo : {
                title : title,
                description : description,
            }}
            await fetch('http://localhost:4000/api/v1/todo/create',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie}`
                },
                body: JSON.stringify(data)
            }).then(resp => {
                console.log(resp)
                if(resp.status === 201){
                    router.push('/memo?done=created')
                }
            });
        }
    }

return (
<div>
    <Head>
        <title>Create a new Notes</title>
    </Head>
    <div>
        <div className="">
            <form action="">
                <div className="w-7/8 mx-auto mt-20 flex items-center justify-center bg-white dark:bg-indigo-900 dark:border-black dark:border-4 rounded-xl shadow-lg w-80 md:w-full max-w-7xl">
                    <input type="text" placeholder="Title" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} className="text-indigo-700 dark:text-gray-50 text-center dark:bg-indigo-900 dark:active: w-4/6 my-2 text-xl md:text-3xl p-3 capitalize font-bold"/>
                </div>
                <div className="w-7/8 mx-auto mt-10 flex items-center justify-center bg-white dark:bg-indigo-900 dark:border-black dark:border-4 rounded-xl shadow-lg w-80 md:w-full max-w-7xl">
                <textarea cols="20" rows="15" value={description} onChange={e => setDescription(e.target.value)} placeholder="Your MeMo..." id="body" name="body" className="md:hidden text-gray-800 dark:text-gray-100 dark:bg-indigo-900 dark:border-black dark:border-4 my-5 text-center text-lg p-5 "></textarea>
                <textarea cols="80" rows="15" value={description} onChange={e => handleDescription(e)} placeholder="Your Notes..." id="body" name="body" className="hidden md:block text-gray-800 my-5 dark:text-gray-100 dark:bg-indigo-900 dark:focus:outline-white text-center text-2xl p-5 "></textarea>
                </div>
            </form>
            <button onClick={(e) => handleSubmitForm(e)} className = " fixed z-10 bg-indigo-700 hover:bg-indigo-500 transition text-white w-16 h-16 md:w-20 md:h-20  border-none cursor-pointer rounded-full bottom-4 right-4 md:bottom-12 md:right-12" >
                <svg className = "fill-current text-white h-6 w-6 ml-5 md:h-10 md:w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.296 32.296">
                    <path d="M31.923 9.14L13.417 27.642a1.27 1.27 0 01-1.793 0L.37 16.316a1.272 1.272 0 010-1.795l2.689-2.687a1.268 1.268 0 011.793 0l7.678 7.729L27.438 4.654a1.272 1.272 0 011.795 0l2.689 2.691c.499.495.499 1.301.001 1.795z"/>
                </svg>
            </button>
        <div>
    </div>
        </div>
    </div>
</div>
);
}