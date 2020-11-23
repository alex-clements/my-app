import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'semantic-ui-css/semantic.css'
import DijkstraApp from './dijkstraApp/dijkstraApp.js'
import NavBar from './components/navBar.js'

export default function DijkstraMethod() {
  return (
    <div className={styles.container}>
      <Head>
        <title>alex clements</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className={styles.main2}>
        <div className="ui text container">
          <h1 className={styles.title}>
            Dijkstra's Algorithm.
          </h1>
        </div>
      <div className='ui horizontal divider'></div>
        <DijkstraApp />
      </main>

      <footer className={styles.footer}>
        powered by alex
      </footer>

    </div>
  )
}
