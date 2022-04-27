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
      })
  }, [])

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()  

  function onSubmit(values) {
    // check if file is plain text, otherwise generate error file type
    if (getFileExtension(values.file[0].name) !== 'txt') {
      setErrorComponent(<AlertError>File harus berupa plain text</AlertError>)
      return
    }
    // check if file is not empty, otherwise generate error file empty
    if (values.file[0].size === 0) {
      setErrorComponent(<AlertError>File tidak boleh kosong</AlertError>)
      return
    }
    getFileContent(values.file[0])
    console.log(fileContent)
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
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} width='100%' colorScheme='teal' isLoading={isSubmitting} type='submit'>
          Submit
        </Button>
      </form>
      <Box mt={4} visibility={props.loading ? 'visible' : 'hidden'}>
        {errorComponent}
      </Box>
    </div>
  )
}

export default FormPrediksi;