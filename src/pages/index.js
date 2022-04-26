import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import '@fontsource/ubuntu'
import Footer from '../components/footer'
import Header from '../components/header'
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
import FormPenyakit from '../components/formpenyakit'
import FormPrediksi from '../components/formprediksi'
import FormRiwayat from '../components/formriwayat'

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
              <FormPenyakit />
            </TabPanel>
            <TabPanel>
              <FormPrediksi />
            </TabPanel>
            <TabPanel>
              <FormRiwayat />
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
