import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>alex clements</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          welcome to alex's site
        </h1>

        <p className={styles.description}>
          existance is pain.
        </p>

        <div className={styles.grid}>

        </div>
      </main>

      <footer className={styles.footer}>
        powered by alex
      </footer>
    </div>
  )
}
