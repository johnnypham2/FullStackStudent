import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
  IconButton,
  Spinner,
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

  const handleDelete = (id: number) => {
    axios.delete(BASE_URL + "Students/" + id).then(() => {
      toast({
        title: "Student Deleted",
        isClosable: true,
        duration: 5000,
        status: "success",
      });
      fetchData();
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <Box shadow="md" rounded="md" p={6} m="4" bg="white">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg">Students Directory</Heading>
        <Button onClick={handleAdd} leftIcon={<AddIcon />} colorScheme="blue">
          Add Student
        </Button>
      </Flex>

      {isLoading ? (
        <Flex justifyContent="center" alignItems="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th color="blue">Student ID</Th>
            <Th color="blue">Name</Th>
            <Th color="blue">Address</Th>
            <Th color="blue" isNumeric>Phone Number</Th>
            <Th color="blue">Email</Th>
            <Th color="blue">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((student: Student) => (
            <Tr key={student.id}>
              <Td color="gray.800">{student.id}</Td>
              <Td color="gray.800">{student.name}</Td>
              <Td color="gray.800">{student.address}</Td>
              <Td color="gray.800" isNumeric>{student.phoneNumber}</Td>
              <Td color="gray.800">{student.email}</Td>
              <Td>
                <HStack spacing={4}>
                  <IconButton
                    aria-label="Edit student"
                    icon={<EditIcon />}
                    onClick={() => getStudent(student.id)}
                    colorScheme="blue"
                  />
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        aria-label="Delete student"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>
                        Are you sure you want to delete this student?
                      </PopoverBody>
                      <PopoverFooter display="flex" justifyContent="flex-end">
                        <Button
                          colorScheme="red"
                          variant="outline"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      
      )}
      {isOpen && (
        <StudentForm
          currentData={currentData}
          fetchStudent={fetchData}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  );
};

export default StudentList;
