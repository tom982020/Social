// import '../../styles/globals.scss'
// import type { AppProps } from 'next/app'
import callAPI from '../api/api'

export default function Layout() {

  callAPI('authors')

  return <main>Welcome to Next.js!
    {/* <button onClick={api}>Click</button> */}
  </main>
}