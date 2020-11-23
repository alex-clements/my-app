import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'semantic-ui-css/semantic.min.css'
import TestCard from './components/testCard.js'
import NavBar from './components/navBar.js'

export default function testPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>alex clements</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Algorithm
        </h1>
        <p className={styles.description}>
        Visualizations
        </p>
        <TestCard pathName="dijkstraMethod" title="Dijkstra's Method" category="Path Finding Algorithms" content="Find the shortest path between two points."/>

      </main>


      <footer className={styles.footer}>
        powered by alex
      </footer>

    </div>
  )
}
