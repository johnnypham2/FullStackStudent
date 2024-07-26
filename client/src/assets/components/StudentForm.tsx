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
  } from '@chakra-ui/react'

interface StudentFormProps {
    isOpen: boolean;
    onClose:() => void
}


const StudentForm = ({isOpen,onClose}:StudentFormProps) => {
  return (
    <>
       
  
 
      

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
                <Input type="text" placeholder="Name"/>
                <Input type="text" placeholder="Address"/>
                <Input type="number" placeholder="Phone Number"/>
                <Input type="Text" placeholder="Email"/>
            </VStack>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  

    
  )
}

export default StudentForm