import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')

  const handleForm = async () => {
    setError('')
    setPassword('')
    await fetch('https://notes-vercel.vercel.app/api/v1/user/register',{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
      body: JSON.stringify({user: {username,email,password}})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if(data.errors) return setError(data.errors[0].msg)
      if(data.user) return router.push('/?register=complete')
      })
  .catch(error => {
    console.log(error)
    }
  );

  }

  return (
    <>
    <Head>
      <title>Register Your Account</title>
    </Head>
       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 py-16 px-6 rounded-xl">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">Register now to use MeMo</h2>
      
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="current-username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border dark:bg-gray-900 border-gray-300 placeholder-gray-500 dark:placeholder-gray-100 text-gray-900 dark:text-gray-50 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
                className="appearance-none rounded-none relative block  dark:bg-gray-900 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 dark:placeholder-gray-100  text-gray-900 focus:outline-none dark:text-gray-50  focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => handleForm()}
            >
             
              Register
            </button>
          </div>
        </form>
        {error&&(<div className="flex justify-center">
            <div className="p-2 bg-red-800 items-center text-red-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
              <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Error</span>
              <span className="font-semibold mr-2 text-left flex-auto">Opps! {error}.</span>
          </div>
          </div>)}
      </div>
    </div>
    </>
  )
}
