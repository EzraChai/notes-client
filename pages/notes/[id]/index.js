import { useRouter } from 'next/router'
import Head from 'next/head'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import Interweave from 'interweave';
import useSWR from 'swr'
import EditButton from '../../../components/EditButton';


const fetchWithToken = (url,cookie) => fetch(url,{
    headers:{
        'Authorization': `Bearer ${cookie}`
        }
}).then((response) => response.json())


export default function Todo(){
    const router = useRouter();
    const cookie = Cookies.get('token')

    useEffect(() => {
        if (!cookie) {
          router.push('/')
        }
      }, [cookie])

    const {data} = useSWR([`http://localhost:4000/api/v1/todo/${router.query.id}`,cookie], fetchWithToken);


    useEffect(() => {
        if(data?.error) {
            router.push('/')
        }
    },[data])

    const deleteHandler = async () =>{
        await fetch(`http://localhost:4000/api/v1/todo/${router.query.id}`,{
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${cookie}`
                }
        }).then(router.push('/notes?done=deleted'));
    }

    
    console.log("data",data?.todo.description)
    
    // const word = stringToHTML(data?.todo.description.replace(/(?:\r\n|\r|\n)/g, '<br>'))
    // console.log(word)
    
    return (
        <div>
            <Head>
                <title>Notes</title>
            </Head>
            <div>
                <div className="">
                    {data?(
                        <>
                            <div className="w-7/8 mx-auto mt-20 bg-white dark:bg-indigo-900 rounded-xl shadow-lg w-80 lg:w-full md:w-9/12 max-w-7xl transition transform hover:-translate-y-1 hover:scale-100">
                                <div className="text-indigo-700 dark:text-gray-50 text-center text-3xl p-3 capitalize font-bold">{data.todo.title}</div>
                            </div>
                            <div className="w-7/8 mx-auto mt-10 bg-white dark:bg-indigo-900 dark:border-black dark:border-4 rounded-xl shadow-lg w-80 lg:w-full md:w-9/12 max-w-7xl transition transform hover:-translate-y-1 hover:scale-100    ">
                                    <div className="text-gray-800 dark:text-gray-100 text-center text-2xl p-5 block">
                                        <Interweave content={data.todo.description.replace(/(?:\r\n|\r|\n)/g, '<br>')}/>
                                    </div>
                                    <div className="flex justify-end mt-8">
                                        <div className="text-grey-700 dark:text-gray-100 p-2 mr-4 text-lg mb-3 mt-auto">Written at : {data.todo.updatedAt.split('T')[0]} </div>
                                    </div>
                            </div>
                            <div>
                                <EditButton id={data.todo._id}></EditButton>
                            <button onClick={deleteHandler} className = " fixed z-10 bg-red-700 hover:bg-red-500 transition text-white w-16 h-16 md:w-20 md:h-20 border-none cursor-pointer rounded-full bottom-24 right-4 md:bottom-36 md:right-12" >
                                <svg className = "fill-current text-white h-6 w-6 ml-5 md:h-10 md:w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384">
                                    <path d="M64 341.333C64 364.907 83.093 384 106.667 384h170.667C300.907 384 320 364.907 320 341.333v-256H64v256zM266.667 21.333L245.333 0H138.667l-21.334 21.333H42.667V64h298.666V21.333z"/>
                                </svg>
                            </button>
                                <div className=" h-52 w-10"></div>
                            </div>
                        </>
                    ):(
                        <div className="flex justify-center items-center">
                        Loading...
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
            
    );
}
