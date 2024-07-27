import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Input,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../constant';
import { Student } from './StudentList';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  fetchStudent: () => void;
  currentData?: Student;
}

const StudentForm = ({ isOpen, onClose, fetchStudent, currentData }: StudentFormProps) => {
  const toast = useToast();

  const [student, setStudent] = useState({
    id: currentData?.id || 0,
    name: currentData?.name || "",
    address: currentData?.address || "",
    phoneNumber: currentData?.phoneNumber || "",
    email: currentData?.email || ""
  });

  useEffect(() => {
    setStudent({
      id: currentData?.id || 0,
      name: currentData?.name || "",
      address: currentData?.address || "",
      phoneNumber: currentData?.phoneNumber || "",
      email: currentData?.email || ""
    });
  }, [currentData]);

  const onSave = () => {
    if (currentData && currentData.id) {
      editStudent();
    } else {
      addStudent();
    }
  };

  const editStudent = () => {
    axios.put(BASE_URL + "Students/" + currentData?.id, student).then(() => {
      onClose();
      fetchStudent();
      toast({
        title: "Student Updated",
        status: "success",
        isClosable: true,
        duration: 5000
      });
    }).catch(error => {
      console.log(error);
    });
  };

  const addStudent = () => {
    axios.post(BASE_URL + "Students", student).then(response => {
      onClose();
      fetchStudent();
      toast({
        title: "Student Added",
        status: "success",
        isClosable: true,
        duration: 5000
      })
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Input
                type="text"
                placeholder="Name"
                value={student.name}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Address"
                value={student.address}
                onChange={(e) => setStudent({ ...student, address: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Phone Number"
                value={student.phoneNumber}
                onChange={(e) => setStudent({ ...student, phoneNumber: e.target.value })}
              />
              <Input
                type="Text"
                placeholder="Email"
                value={student.email}
                onChange={(e) => setStudent({ ...student, email: e.target.value })}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={onSave} colorScheme='blue'>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StudentForm;
