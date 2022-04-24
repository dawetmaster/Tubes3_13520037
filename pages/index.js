import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import '@fontsource/ubuntu'
import Footer from '../components/footer'
import Header from '../components/header'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1>Privyet!</h1>
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  )
}
