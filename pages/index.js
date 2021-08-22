import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'

export default function Home() {
  const router = useRouter()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [register,setRegister] = useState(false)
  const [times,setTimes] = useState(0)

  useEffect(() => {
    if(router.query.register){
      setRegister(true)
      setTimes(times+1)
    }
  },[router.query.register,times])


  const handleForm = async () => {
    setError('')
    setRegister(false)
    await fetch('https://notes-vercel.vercel.app/api/v1/user/login',{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
      body: JSON.stringify({user: {email,password}})
    })
    .then((response) => response.json())
    .then((data) => {
      setPassword('')
      if(data.errors){
        return setError(data.errors[0].msg)
      }
      ///set  Cookie here
      document.cookie = "token=" + data.token/*token location*/
      router.push('/notes')
    })
  .catch(error => {
    console.log(error)
    }
  );
  }

  const handleKeyPress = (event) => {
    console.log("Running")
    if(event.key === 'Enter'){
        handleForm();
    }
  }

  return (
    <>
    <Head>
      <title>Login to use Notes</title>
    </Head>
       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 py-16 px-6 rounded-xl">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">Sign in to use Notes</h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link href="/register">
              <a className="font-medium text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-indigo-200">
                register an account here
              </a>
            </Link>
            
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border dark:bg-gray-900 border-gray-300 placeholder-gray-500 dark:placeholder-gray-100 text-gray-900 dark:text-gray-50 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={e => handleKeyPress(e)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block  dark:bg-gray-900 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 dark:placeholder-gray-100  text-gray-900 rounded-b-md focus:outline-none dark:text-gray-50  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={e => handleKeyPress(e)}
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => handleForm()}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>
        {error&&(<div className="flex justify-center">
            <div className="p-2 bg-red-800 items-center text-red-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
              <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Error</span>
              <span className="font-semibold mr-2 text-left flex-auto">Opps! {error}.</span>
          </div>
          </div>)}
          {register&&times<2&&(<div className="flex justify-center">
            <div className="p-2 bg-green-800 items-center text-green-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
              <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">Complete</span>
              <span className="font-semibold mr-2 text-left flex-auto">Yay! You had registered.</span>
          </div>
          </div>)}
      </div>
    </div>
    </>
  )
}

