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

    useEffect(() => {
        router.query.done&&setResponse(router.query.done)
        if(!cookie) router.push('/')
    },[router])

    const {data} = useSWR(['http://localhost:4000/api/v1/todo',cookie],fetchWithToken);

    console.log(data)
    
    return (
        <div>
            <Head>
                <title>Notes</title>
            </Head>
            <div className="">
                {data?(
                    <>
                    {response&&(<div className=" w-7/8 mx-auto mt-20 w-80 md:w-full max-w-7xl">
                        <div className="flex justify-center">
                            <button onClick={()=>setResponse(null)} className="p-2 bg-green-800 items-center text-green-100 leading-none rounded-full flex lg:inline-flex" role="alert">
                            <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs md:text-sm font-bold mr-3">Success</span>
                            <span className="font-semibold text-sm md:text-base mr-2 text-left flex-auto">Nice! You had {response} a Note.</span>
                        </button>
                    </div>
                    </div>)}
                    <div className={response?"w-7/8 mx-auto mt-5 bg-white dark:bg-gray-900 rounded-xl shadow-lg w-80 md:w-full max-w-7xl":"w-7/8 mx-auto mt-20 md:w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg w-80 max-w-7xl"}>
                        <div className="divide-y-2 divide-gray-600 divide-dashed">
                            <h1 className="text-3xl px-10 pt-5 pb-3 md:pt-10 md:pb-7 dark:text-white">{data.todos[1]?"My Notes":"My Note"}</h1>
                            <div></div>
                        </div>
                        <div className="p-4 md:p-6 max-w-7xl gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    
                        {data.todos.map((item,index) => (
                            <Card item={item} key={index}></Card>
                            // <h1 key={index} item={item}>{item.title}</h1>
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
            </div>
        </div>
    );
}
