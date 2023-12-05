import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import ActionCard from "./ActionCard";
import { useContext } from "react";
import { ActionContext } from "../context/context";
import AddCard from "./AddCard";
import AddModal from "./AddModal";
import EditModal from "./EditModal";

const ActionList = (): JSX.Element => {
  const { actions } = useContext(ActionContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <AddModal isOpen={isOpen} onClose={onClose} />
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {actions.sort((action1, action2) => action1.id - action2.id).map((action) => (
          <ActionCard action={action} key={action.id} />
        ))}
        <AddCard setOpen={onOpen} />
      </Grid>
    </>
  );
};

export default ActionList;
