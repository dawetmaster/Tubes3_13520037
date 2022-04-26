import React from 'react'
import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  InputGroup,
  Box,
} from '@chakra-ui/react'
import AlertError from './alert'

export default function FormRiwayat() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const [errorComponent, setErrorComponent] = React.useState(null)
  const [fileContent, setFileContent] = React.useState('')

  function getFileExtension(filename) {
    return filename.split('.').pop()
  }

  function generateErrorComponent(error) {
    return (
      <AlertError>
        {error.message}
      </AlertError>
    )
  }

  function onSubmit(values) {
    console.log(values.name)
    console.log(getFileExtension(values.file[0].name))
    // check if file is plain text, otherwise generate error file type
    if (getFileExtension(values.file[0].name) !== 'txt') {
      setErrorComponent(<AlertError>File harus berupa plain text</AlertError>)
      return
    }
    // check if file is not empty, otherwise generate error file empty
    if (values.file[0].size === 0) {
      setErrorComponent(<AlertError>File harus berupa plain text</AlertError>)
      return
    }
    getFileContent(values.file[0])
    console.log(fileContent)
  }

  // function to get file content
  function getFileContent(file) {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function () {
      let content = reader.result
      setFileContent(content)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor='name'>Nama Pengguna</FormLabel>
          <Input
            id='name'
            placeholder='name'
            accept='text/plain'
            {...register('name', {
              required: 'Nama pengguna harus diisi',
              minLength: { value: 3, message: 'Panjang nama minimal tiga huruf' },
            })}
            mb={4}
          />
          <FormLabel htmlFor='disease'>Nama Penyakit</FormLabel>
          <Input
            id='disease'
            placeholder='disease'
            accept='text/plain'
            {...register('disease', {
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
        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
          Submit
        </Button>
      </form>
      <Box mt={4}>
        {errorComponent}
      </Box>
    </div>
  )
}