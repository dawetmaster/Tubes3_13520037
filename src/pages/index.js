import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import '@fontsource/ubuntu'
import Footer from '../components/footer'
import Header from '../components/header'
import AlertError from '../components/alerterror'
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import HookForm from '../components/hookform'

export default function Home({isConnected}) {

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Tabs>
          <TabList>
            <Tab>Input Penyakit</Tab>
            <Tab>Prediksi Penyakit</Tab>
            <Tab>Riwayat Penyakit</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <HookForm />
            </TabPanel>
            <TabPanel>
              <p> Tab 2</p>
            </TabPanel>
            <TabPanel>
              <p> Tab 3</p>
            </TabPanel>
          </TabPanels>      
        </Tabs>
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
