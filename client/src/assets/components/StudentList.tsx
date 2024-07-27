import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant";
import StudentForm from "./StudentForm";

export interface Student {
  id: number;
  name: string;
  address: string;
  phoneNumber: number;
  email: string;
}

const StudentList = () => {

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentData, setCurrentData] = useState<Student>({} as Student);

  const [data, setData] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + "Students")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Full error:", error);
        console.log("Error response:", error.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getStudent = (id: number) => {
    axios
      .get<Student>(BASE_URL + "Students/" + id)
      .then((res) => {
        setCurrentData(res.data);
        onOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAdd = () => {
    onOpen();
    setCurrentData({} as Student);
  };

const handleDelete =(id:number) => {
  axios.delete(BASE_URL+"Students/"+id).then(() => {
    toast({
      title:"Student Deleted",
      isClosable:true,
      duration: 5000
    })
    fetchData();
  }).catch(error => {
    console.log(error)
  })
}


  return (
    <>
      <Box shadow={"md"} rounded={"md"} m={32}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          px={"5"}
          mb={10}
        >
          <Heading>Students Directory</Heading>
          <Button
            onClick={handleAdd}
            leftIcon={<AddIcon />}
            colorScheme="blue"
          >
            Add Student
          </Button>
        </Flex>

        <TableContainer>
          <Table variant="striped" colorScheme="grey">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Student ID</Th>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th isNumeric>Phone Number</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((student: Student) => (
                <Tr key={student.id}>
                  <Td>{student.id}</Td>
                  <Td>{student.name}</Td>
                  <Td>{student.address}</Td>
                  <Td>{student.phoneNumber}</Td>
                  <Td>{student.email}</Td>
                  <HStack>
                    <EditIcon
                      onClick={() => getStudent(student.id)}
                      boxSize={22}
                    />
                    <Popover>
                      <PopoverTrigger>
                    <DeleteIcon boxSize={22} color={"red.400"} />
                        
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody>
                          Are you sure you want to Delete?
                        </PopoverBody>
                        <PopoverFooter>
                          <Button colorScheme="red" variant={'outline'} onClick={() => handleDelete(student.id)}>Delete</Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>

                  </HStack>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {isOpen && (
          <StudentForm
            currentData={currentData}
            fetchStudent={fetchData}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
      </Box>
    </>
  );
};

export default StudentList;
