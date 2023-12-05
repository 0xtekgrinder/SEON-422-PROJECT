import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Icon,
  Spacer,
  Switch,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ActionType } from "../types";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { deleteAction, updateAction } from "../utils/action";
import { useContext } from "react";
import { ActionContext } from "../context/context";
import EditModal from "./EditModal";

type ActionCardProps = {
  action: ActionType;
};

const ActionCard = ({ action }: ActionCardProps): JSX.Element => {
  const { actions, setActions } = useContext(ActionContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <EditModal
        isOpen={isOpen}
        onClose={onClose}
        enabledInput={action.enabled}
        inputReplicaInput={action.inputReplica}
        outputReplicaInput={action.outputReplica}
        inputValueInput={action.inputValue}
        outputValueInput={action.outputValue}
        nameInput={action.name}
        conditionInput={action.condition}
        idInput={action.id}
      />

      <Card maxWidth={400} p={6}>
        <CardHeader>
          <HStack width="full">
          <Text fontSize="xl">{action.name}</Text>
          <Spacer />
          <Switch 
              isChecked={action.enabled} 
              onChange={() => updateAction(action.id, action.name, action.inputReplica, action.outputReplica, action.inputValue, action.outputValue, action.condition, !action.enabled, actions, setActions)} 
              colorScheme="teal"
            />
            </HStack>
        </CardHeader>
        <CardBody>
          <VStack align="start" spacing={4}>
            <Text>Input replica: {action.inputReplica}</Text>
            <Text>Output replica: {action.outputReplica}</Text>
            <Text>Input Value: {action.inputValue}</Text>
            <Text>Output Value: {action.outputValue}</Text>
            <Text>Condition: {action.condition}</Text>
          </VStack>
        </CardBody>
        <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                leftIcon={<EditIcon />}
                colorScheme="teal"
                variant="outline"
                onClick={onOpen}
              >
                Edit
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                variant="outline"
                onClick={async () => {
                  deleteAction(action.id, actions, setActions);
                }}
              >
                Remove
              </Button>
            </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default ActionCard;
