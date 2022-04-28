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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import AlertGenerator from './alertGenerator'
import dateToString from '../lib/dateToString'

export default function FormRiwayat() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const [errorComponent, setErrorComponent] = React.useState(null)
  const [submit, setSubmit] = React.useState(false)
  const [tableVisibility, setTableVisibility] = React.useState(false)
  const [tableData, setTableData] = React.useState([])

  async function onSubmit(values) {
    setSubmit(true)
      const response = await fetch(`api/search`, {
        method: 'POST',
        body: values.search,
      })
      const data = await response.json()
      if (response.status === 200) {
        if (data.success) {
          setErrorComponent(AlertGenerator({ message: data.message, status: 'success' }))
          setTableVisibility(true)
          setTableData(data.data)
        }
        else {
          setErrorComponent(AlertGenerator({ message: data.message, status: 'error' }))
          setTableVisibility(false)
          setTableData([])
        }
      } else {
        setErrorComponent(AlertGenerator({ message: data.message, status: 'error' }))
        setTableVisibility(false)
        setTableData([])
      }
    setSubmit(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor='search'>Kata Kunci</FormLabel>
          <Input
            id='search'
            placeholder='Ketikkan tanggal dan/atau penyakit...'
            accept='text/plain'
            {...register('search', {
              required: 'Isi kata kunci pencarian',
              minLength: { value: 1, message: 'Pencarian harus diisi' },
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
      <Table visibility={tableVisibility ? 'visible' : 'hidden'}>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Tanggal</Th>
            <Th>Nama Pasien</Th>
            <Th>Nama Penyakit</Th>
            <Th>Kemiripan</Th>
            <Th>Hasil</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((data, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{dateToString(new Date(data.date))}</Td>
              <Td>{data.patient_name}</Td>
              <Td>{data.disease_name}</Td>
              <Td>{Number(data.similarity).toFixed(2) + "%"}</Td>
              <Td>{data.result ? 'True' : 'False'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}