import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <h1>Rejected Again?</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </main>

      <Footer />
    </div>
  )
}
