import { useState, useContext, useEffect } from "react";
import { addAction, updateAction } from "../utils/action";
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

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  inputReplicaInput: string;
  outputReplicaInput: string;
  inputValueInput: string;
  outputValueInput: string;
  nameInput: string;
  conditionInput: ConditionType;
  enabledInput: boolean;
  idInput: number;
};

const EditModal = ({
  isOpen,
  onClose,
  inputReplicaInput,
  outputReplicaInput,
  inputValueInput,
  outputValueInput,
  nameInput,
  conditionInput,
  enabledInput,
  idInput,
}: EditModalProps): JSX.Element => {
  const { actions, setActions } = useContext(ActionContext);
  const [inputReplica, setInputReplica] = useState(inputReplicaInput);
  const [outputReplica, setOutputReplica] = useState(outputReplicaInput);
  const [inputValue, setInputValue] = useState(inputValueInput);
  const [outputValue, setOutputValue] = useState(outputValueInput);
  const [name, setName] = useState(nameInput);
  const [condition, setCondition] = useState(conditionInput);
  const [enabled, setEnabled] = useState(enabledInput);

  const [inputReplicas, setInputReplicas] = useState<string[]>([]);
  const [outputReplicas, setOutputReplicas] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const inputReplicas = await getInputReplicas();
      const outputReplicas = await getOutputReplicas();
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
            Edit Action
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
                onChange={(e) => setInputReplica(e.target.value)}
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
                onChange={(e) => setOutputReplica(e.target.value)}
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
                  updateAction(
                    idInput,
                    name,
                    inputReplica,
                    outputReplica,
                    inputValue,
                    outputValue,
                    condition,
                    enabled,
                    actions,
                    setActions,
                  );
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

export default EditModal;
