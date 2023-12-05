import { StarIcon } from "@chakra-ui/icons";
import { Flex, Heading, Icon, Spacer } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      bg="teal.500"
      w="100%"
      p={4}
      color="white"
      alignItems="center"
      justifyContent="space-between"
    >
      <Icon as={StarIcon} boxSize={6} />
      <Spacer />
      <Heading size="lg">IOT BOARD</Heading>
      <Spacer />
    </Flex>
  );
};

export default Header;
