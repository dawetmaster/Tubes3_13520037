import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/ubuntu'
import '@fontsource/ubuntu-mono'
import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
