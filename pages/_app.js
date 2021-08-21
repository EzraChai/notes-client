import '../styles/globals.css'
import useDarkMode from '../hooks/useDarkMode'

function MyApp({ Component, pageProps }) {
  useDarkMode()
  return <Component {...pageProps} />
}

export default MyApp
