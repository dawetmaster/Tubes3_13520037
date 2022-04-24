import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import '@fontsource/ubuntu'
import Footer from '../components/footer'
import Header from '../components/header'
import AlertError from '../components/alerterror'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

export default function Home({isConnected}) {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <FormControl m='1em'>
          <FormLabel>Nama Penyakit</FormLabel>
          <Input id="penyakit" />
          <FormHelperText>Masukkan nama penyakit</FormHelperText>
        </FormControl>
        <AlertError children={'Not okay'} />
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the folloing code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
