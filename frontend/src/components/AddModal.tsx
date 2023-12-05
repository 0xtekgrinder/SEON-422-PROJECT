import { useState, useContext, useEffect } from "react";
import { addAction } from "../utils/action";
import { ActionContext } from "../context/context";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { ConditionType } from "../types";
import { getInputReplicas, getOutputReplicas } from "../utils/replica";

const AddModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element => {
  const { actions, setActions } = useContext(ActionContext);
  const [inputReplica, setInputReplica] = useState(
    undefined as string | undefined,
  );
  const [outputReplica, setOutputReplica] = useState(
    undefined as string | undefined,
  );
  const [inputValue, setInputValue] = useState(undefined as string | undefined);
  const [outputValue, setOutputValue] = useState(
    undefined as string | undefined,
  );
  const [name, setName] = useState(undefined as string | undefined);
  const [condition, setCondition] = useState(ConditionType.EQUAL);

  const [inputReplicas, setInputReplicas] = useState<string[]>([]);
  const [outputReplicas, setOutputReplicas] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const inputReplicas = await getInputReplicas();
      const outputReplicas = await getOutputReplicas();
      if (inputReplicas.length !== 0) {
        setInputReplica(inputReplicas[0].id);
      }
      if (outputReplicas.length !== 0) {
        setOutputReplica(outputReplicas[0].id);
      }
      setInputReplicas(inputReplicas.map((replica: any) => replica.id));
      setOutputReplicas(outputReplicas.map((replica: any) => replica.id));
    };
    fetchData();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl" mb={3}>
            Add Action
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="inputReplica" mb={4}>
              <FormLabel>Input replica</FormLabel>
              <Select
                value={inputReplica}
                onChange={(e) => setInputReplica(e.target.value as string)}
              >
                {inputReplicas.map((replica) => (
                  <option key={replica} value={replica}>
                    {replica}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="outputReplica" mb={4}>
              <FormLabel>Output replica</FormLabel>
              <Select
                value={outputReplica}
                onChange={(e) => setOutputReplica(e.target.value as string)}
              >
                {outputReplicas.map((replica) => (
                  <option key={replica} value={replica}>
                    {replica}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="inputValue" mb={4}>
              <FormLabel>Input Value</FormLabel>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </FormControl>

            <FormControl id="outputValue" mb={4}>
              <FormLabel>Output Value</FormLabel>
              <Input
                value={outputValue}
                onChange={(e) => setOutputValue(e.target.value)}
              />
            </FormControl>

            <FormControl id="condition">
              <FormLabel>Condition</FormLabel>
              <Select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ConditionType)}
              >
                <option value={ConditionType.EQUAL}>Equal</option>
                <option value={ConditionType.GREATER}>Greater</option>
                <option value={ConditionType.LESS}>Less</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                colorScheme="teal"
                type="submit"
                onClick={() => {
                  addAction(
                    name!,
                    inputReplica!,
                    outputReplica!,
                    inputValue!,
                    outputValue!,
                    condition,
                    actions,
                    setActions,
                  );
                  setInputReplica(undefined);
                  setOutputReplica(undefined);
                  setInputValue(undefined);
                  setOutputValue(undefined);
                  setCondition(ConditionType.EQUAL);
                  onClose();
                }}
                isDisabled={
                  !name ||
                  !inputReplica ||
                  !outputReplica ||
                  !inputValue ||
                  !outputValue ||
                  !condition
                }
              >
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddModal;
