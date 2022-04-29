import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Box,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import AlertGenerator from './alertGenerator'
import sanitizeString from '../lib/stringSanitizer'
import { getFileContent } from '../lib/getFileContent'
import { getFileExtension } from '../lib/getFileExtension'
import axios from 'axios'

function FormPrediksi() {

  const [props, setProps] = React.useState({
    data: [],
    loading: true,
  })

  const [errorComponent, setErrorComponent] = React.useState(
    AlertGenerator({ message: 'Memuat database penyakit...', status: 'info' })
  )

  React.useEffect(() => {
    axios.get('/api/diseases')
      .then(res => {
        console.log(res.data)
        setProps({
          data: res.data.data,
          loading: false,
        })
        setErrorComponent(null)
      })
  }, [])

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()  

  const [submit, setSubmit] = React.useState(false)
  const [method, setMethod] = React.useState('KMP')

  function onSubmit(values) {
    setSubmit(true)
    console.log(values)
    // check file extension
    if (getFileExtension(values.file[0].name) !== 'txt') {
      setErrorComponent(
        AlertGenerator({ message: 'File harus berupa .txt', status: 'error' })
      )
    // check file size
    } else if (values.file[0].size === 0) {
      setErrorComponent(
        AlertGenerator({ message: 'File tidak boleh kosong', status: 'error' })
      )
    } else {
      let promise = getFileContent(values.file[0])
      promise.then(async (result) => {
        // validate DNA sequence
        let stringStatusPromise = await fetch(`/api/checkDNA`, {
          method: "POST",
          body: sanitizeString(result.content),
        })
        if (stringStatusPromise.status !== 200) {
          let stringStatus = await stringStatusPromise.json()
          setErrorComponent(
            AlertGenerator({ message: stringStatus.message, status: 'error' })
          )
          setSubmit(false)
          return
        }
        let stringStatus = await stringStatusPromise.json()
        // post check similarity request
        let similarityPromise = await fetch(`/api/checkSimilarity`, {
          method: "POST",
          body: JSON.stringify({
            name: values.name,
            disease: values.disease,
            dna: stringStatus.dna,
            method: values.method,
          }),
        })
        if (similarityPromise.status !== 200) {
          let similarity = await similarityPromise.json()
          setErrorComponent(
            AlertGenerator({ message: similarity.message, status: 'error' })
          )
          setSubmit(false)
          return
        }
        let similarity = await similarityPromise.json()
        console.log(similarity.data)
        // add to db by histories
        let addHistoryPromise = await fetch(`/api/histories`, {
          method: "POST",
          body: JSON.stringify(similarity.data),
        })
        let addHistory = await addHistoryPromise.json()
        if (addHistoryPromise.status !== 201) { 
          setErrorComponent(
            AlertGenerator({ message: addHistory.message, status: 'error' })
          )
          setSubmit(false)
          return
        }
        console.log(addHistory)
        setErrorComponent(
          AlertGenerator({ message: addHistory.message, status: 'success' })
        )
        
      }).catch(err => {
        console.log(err)
        setErrorComponent(
          AlertGenerator({ message: err.message, status: 'error' })
        )
      })
    }
    setSubmit(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor='name'>Nama Pengguna</FormLabel>
          <Input
            id='name'
            placeholder='Contoh: Asep'
            accept='text/plain'
            {...register('name', {
              required: 'Nama pengguna harus diisi',
              minLength: { value: 3, message: 'Panjang nama minimal tiga huruf' },
            })}
            mb={4}
          />
          <FormLabel htmlFor='disease'>Nama Penyakit</FormLabel>
          <Select
            id='disease'
            placeholder='Pilih salah satu...'
            accept='text/plain'
            {...register('disease', {
              required: 'Nama penyakit harus diisi',
              minLength: { value: 3, message: 'Panjang nama penyakit minimal tiga huruf' },
            })}
            mb={4}
          >
            {props.data.map(disease => (
              <option key={disease.id} value={disease.id}>{disease.name}</option>
            ))}
          </Select>
          <FormLabel htmlFor='file'>Input File (*.txt)</FormLabel>
          <Input
            type="file"
            name='file'
            {...register('file', {
              required: 'File DNA harus diunggah',
            })}
            mb={4}
          />
          <FormLabel htmlFor='method'>Metode</FormLabel>
          <RadioGroup>
            <Stack direction='row' spacing={4} mb={4}>
              <Radio
                colorScheme='teal'
                value='KMP'
                {...register
                  ("method", 
                  { required: true }
                  )
                }
              >
                KMP
              </Radio>
              <Radio
                colorScheme='teal'
                value='BM'
                {...register
                  ("method", 
                  { required: true }
                  )
                }
              >
                BM
              </Radio>
            </Stack>
          </RadioGroup>      
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} width='100%' colorScheme='teal' isLoading={submit} type='submit'>
          Submit
        </Button>
      </form>
      <Box mt={4}>
        {errorComponent}
      </Box>
    </div>
  )
}

export default FormPrediksi;