import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Flex,
    Heading,
    Button,
    HStack,
    useDisclosure,
  } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../constant';
import StudentForm from './StudentForm';

  interface Student {
    id:number,
    name:string,
    address:string,
    phoneNumber:number,
    email:string
  }

  
  
  const StudentList = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
      
      const [data, setData] = useState<Student[]>([]);
      const [isLoading, setIsLoading] = useState<boolean>(false)
    
      const fetchData = () => {
        setIsLoading(true)
        axios.get(BASE_URL + "Students").then(response => {
            setData(response.data);
        }).catch((error) => {
            console.log("Full error:", error);
            console.log("Error response:", error.response);
        }).finally(() => {
            setIsLoading(false)
        })
      }
      useEffect(() => {
        fetchData();
      }, [])


  return (
    <>
    <Box shadow={'md'} rounded={'md'} m={32}>
    <Flex justifyContent={'space-between'} alignItems={'center'} px={'5'} mb={10}>
    <Heading>
        Students Directory
    </Heading>
    <Button onClick={onOpen} leftIcon={<AddIcon/>} colorScheme='blue'>
        Add Student
    </Button>

    </Flex>



        <TableContainer>
  <Table variant='striped' colorScheme='grey'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>Id</Th>
        <Th>Name</Th>
        <Th>Address</Th>
        <Th isNumeric>Phone Number</Th>
        <Th>Email</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.map((student:Student) => (
        <Tr key={student.id}>
            <Td>{student.id}</Td>
            <Td>{student.name}</Td>
            <Td>{student.address}</Td>
            <Td>{student.phoneNumber}</Td>
            <Td>{student.email}</Td>
            <HStack>
                <EditIcon boxSize={22}/>
                <DeleteIcon boxSize={22} color={'red.400'}/>
            </HStack>
        </Tr>
      ))}
    </Tbody>

  </Table>
</TableContainer> 
{isOpen && <StudentForm isOpen={isOpen} onClose={onClose}/>}
    </Box>

    </>
  )
}

export default StudentList