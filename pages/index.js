import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Alex's Site
        </h1>

        <p className={styles.description}>
          This is obviously not finished.
        </p>

        <div className={styles.grid}>

        </div>
      </main>

      <footer className={styles.footer}>
        Powered by Alex
      </footer>
    </div>
  )
}
