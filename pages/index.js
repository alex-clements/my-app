import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'semantic-ui-css/semantic.min.css'
import NavBar from './components/navBar.js'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>alex clements</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Alex's Site
        </h1>
        <p className={styles.description}>
          This is my domain now.
        </p>
      </main>

      <footer className={styles.footer}>
        powered by alex
      </footer>

    </div>
  )
}
