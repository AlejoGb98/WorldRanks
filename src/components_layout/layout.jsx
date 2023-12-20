import Header from "./header"
import Head from "next/head"

const Layout = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{`World Rank - ${title}`} </title>
      </Head>
      <Header/>

      {children}
    
    </>
  )
}

export default Layout
