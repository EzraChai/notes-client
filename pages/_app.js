import '../styles/globals.css'
import useDarkMode from '../hooks/useDarkMode'
import Header from '../components/header'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useDarkMode()
  return (<>{router.pathname === '/' || router.pathname === '/register'?<></>:<Header/>}
  <Component {...pageProps} />
  </>)
}

export default MyApp
