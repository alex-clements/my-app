import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'semantic-ui-css/semantic.min.css'
import TestCard from './components/testCard.js'
import NavBar from './components/navBar.js'
import {useState, useEffect} from 'react'

export default function testPage() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imgs = [
      '/dijkstraImage.png'
    ];
    cacheImages(imgs);
  })

  const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise(function(resolve, reject) {
        const img = new  Image();
        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
        console.log("Image cached");
      });
    });
    await Promise.all(promises);
    setIsLoading(false);

  };

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

        <div style={{height: "215px"}}>
        {isLoading ?  null : <TestCard imageSource='/dijkstraImage.png' pathName="dijkstraMethod" title="Dijkstra's Method" category="Path Finding Algorithms" content="Find the shortest path between two points."/>}
        </div>

      </main>

      <footer className={styles.footer}>
        powered by alex
      </footer>

    </div>
  )
}
