import { useRouter } from 'next/router'
import Head from 'next/head'
import Cookies from 'js-cookie';
import { useEffect,useState } from 'react';
import Card from '../../components/Card'
import useSWR from 'swr'
import CreateButton from '../../components/CreateButton';

const fetchWithToken = (url,cookie) => fetch(url,{
    headers:{
        'Authorization': `Bearer ${cookie}`
        }
}).then((response) =>{ 
    if(response.status !== 200)return router.push('/')
    return response.json()})


export default function Todo(){
    const router = useRouter();
    const [response,setResponse] = useState();
    const cookie = Cookies.get('token');
    const [click,setClick] = useState(false);

    useEffect(() => {
        router.query.done&&setResponse(router.query.done)
        if(!cookie) router.push('/')
    },[router])

    const {data} = useSWR(['https://notes-vercel.vercel.app/api/v1/todo',cookie],fetchWithToken);

    console.log(data)
    
    return (
        <div>
            <Head>
                <title>Notes</title>
            </Head>
            <div className="">
                {data?(
                    <>
                    {response&&!click&&(<div className=" w-7/8 mx-auto mt-20 w-80 md:w-9/12 lg:w-full max-w-7xl">
                        <div className="flex justify-center">
                            <button onClick={()=>{setResponse(null);setClick(true)}} className="p-2 bg-green-800 items-center text-green-100 leading-none rounded-full flex lg:inline-flex" role="alert">
                            <div className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs md:text-sm font-bold mr-3">Success</div>
                            <div className="font-semibold text-sm md:text-base mr-2 text-left flex-auto">Nice! You had {response} a Note. </div><div>
                            <svg className="w-6 h-6 fill-current text-green-500 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.016 74.984c-99.979-99.979-262.075-99.979-362.033.002-99.978 99.978-99.978 262.073.004 362.031 99.954 99.978 262.05 99.978 362.029-.002 99.979-99.956 99.979-262.051 0-362.031zm-30.168 331.86c-83.318 83.318-218.396 83.318-301.691.004-83.318-83.299-83.318-218.377-.002-301.693 83.297-83.317 218.375-83.317 301.691 0s83.316 218.394.002 301.689z"/><path d="M361.592 150.408c-8.331-8.331-21.839-8.331-30.17 0l-75.425 75.425-75.425-75.425c-8.331-8.331-21.839-8.331-30.17 0s-8.331 21.839 0 30.17l75.425 75.425L150.43 331.4c-8.331 8.331-8.331 21.839 0 30.17 8.331 8.331 21.839 8.331 30.17 0l75.397-75.397 75.419 75.419c8.331 8.331 21.839 8.331 30.17 0 8.331-8.331 8.331-21.839 0-30.17l-75.419-75.419 75.425-75.425c8.331-8.331 8.331-21.838 0-30.17z"/></svg>
                                </div>
                        </button>
                    </div>
                    </div>)}
                    <div className={response?"w-7/8 mx-auto mt-5 bg-white dark:bg-gray-900 rounded-xl shadow-lg w-80 md:w-9/12 lg:w-full max-w-7xl":"w-7/8 mx-auto mt-20 lg:w-full md:w-9/12 bg-white dark:bg-gray-900 rounded-xl shadow-lg w-80 max-w-7xl"}>
                        <div className="divide-y-2 divide-gray-600 divide-dashed">
                            <h1 className="text-3xl px-10 pt-5 pb-3 md:pt-10 md:pb-7 dark:text-white">{data.todos[1]?"My Notes":"My Note"}</h1>
                            <div></div>
                        </div>
                        <div className="p-4 md:p-6 max-w-7xl gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    
                        {data.todos.map((item,index) => (
                            <Card item={item} key={index}></Card>
                        ))}
                        </div>
                        <p className=" text-xl px-10 py-5 float-right dark:text-white">Total of {data.todosCount -1 } {data.todosCount -1 <= 1 ? "Note":"Notes"}</p>
                        <CreateButton></CreateButton>
                    </div>
                    </>
                ):(
                    <div className="flex justify-center items-center">
                        <h1>Loading...</h1>
                    </div>
                )}
                        <div className=" h-52 w-10"></div>
            </div>
        </div>
    );
}
