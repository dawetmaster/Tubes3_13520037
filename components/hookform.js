import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  InputGroup,
} from '@chakra-ui/react'

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function getFileExtension(filename) {
    return filename.split('.').pop()
  }

  function onSubmit(values) {
    console.log(values.name)
    console.log(values.file[0].name)
    console.log(values.file[0].type)
    console.log(values.file[0].size)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='name'>Nama Penyakit</FormLabel>
        <Input
          id='name'
          placeholder='name'
          {...register('name', {
            required: 'This is required',
            minLength: { value: 3, message: 'Minimum length should be 3' },
          })}
          mb={4}
        />
        <FormLabel htmlFor='file'>Input File (*.txt)</FormLabel>
        <Input
          type="file"
          name='file'
          {...register('file', {
            required: 'This is required',
            minLength: { value: 3, message: 'Minimum length should be 3' },
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
  )
}