import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from '@chakra-ui/react'
import AlertGenerator from './alertGenerator'
import sanitizeString from '../lib/stringSanitizer'
import { getFileContent } from '../lib/getFileContent'
import { getFileExtension } from '../lib/getFileExtension'

export default function FormPenyakit() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const [errorComponent, setErrorComponent] = React.useState(null)
  const [submit, setSubmit] = React.useState(false)

  async function onSubmit(values) {
    setSubmit(true)
    // check if file is plain text, otherwise generate error file type
    if (getFileExtension(values.file[0].name) !== 'txt') {
      setErrorComponent(<AlertGenerator message='File harus berupa .txt' status='error' />)
      setSubmit(false)
      return
    }
    // check if file is not empty, otherwise generate error file empty
    if (values.file[0].size === 0) {
      setErrorComponent(AlertGenerator({ message: 'File tidak boleh kosong', status: 'error' }))
      setSubmit(false)
      return
    }
    let promise = getFileContent(values.file[0])
    promise.then(async (result) => {
      // validate DNA sequence
      let stringStatusPromise = await fetch(`/api/checkDNA`, {
        method: "POST",
        body: sanitizeString(result.content),
      })
      if (stringStatusPromise.status !== 200) {
        let stringStatus = await stringStatusPromise.json()
        setErrorComponent(AlertGenerator({ message: stringStatus.message, status: 'error' }))
        setSubmit(false)
        return
      }
      let stringStatus = await stringStatusPromise.json()
      // post new disease to database
      let diseasePromise = await fetch(`/api/diseases`, {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          dna: stringStatus.dna,
        }),
      })
      if (diseasePromise.status !== 201) {
        let disease = await diseasePromise.json()
        setErrorComponent(AlertGenerator({ message: disease.message, status: 'error' }))
        setSubmit(false)
        return
      }
      let disease = await diseasePromise.json()
      setErrorComponent(AlertGenerator({ message: disease.message, status: 'success' }))
      setSubmit(false)
    }).catch(error => {
      setErrorComponent(AlertGenerator({ message: error.message, status: 'error' }))
      setSubmit(false)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor='name'>Nama Penyakit</FormLabel>
          <Input
            id='name'
            placeholder='Contoh: TBC'
            accept='text/plain'
            {...register('name', {
              required: 'Nama penyakit harus diisi',
              minLength: { value: 3, message: 'Panjang nama penyakit minimal tiga huruf' },
            })}
            mb={4}
          />
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