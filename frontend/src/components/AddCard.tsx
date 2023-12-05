import { Card, Center, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

type AddCardProps = {
  setOpen: (open: boolean) => void;
};

const AddCard = ({ setOpen }: AddCardProps): JSX.Element => (
  <Card
    sx={{
      maxWidth: 400,
      height: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: 6,
    }}
    _hover={{
      bg: "gray.100",
      transition: "all 0.2s ease-in-out",
      cursor: "pointer",
    }}
    onClick={() => setOpen(true)}
  >
    <AddIcon boxSize={6} />
  </Card>
);

export default AddCard;
