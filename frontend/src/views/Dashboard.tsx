import { useEffect, useState } from "react";
import { ActionType, ConditionType } from "../types";
import ActionList from "../components/ActionList";
import { ActionContext } from "../context/context";
import AddModal from "../components/AddModal";
import Header from "../components/Header";
import { Box } from "@chakra-ui/react";
import { getActions } from "../utils/action";

const Dashboard = (): JSX.Element => {
  const [actions, setActions] = useState<ActionType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      getActions(setActions);
    };
    fetchData();
  }, []);

  return (
    <>
      <ActionContext.Provider value={{ actions, setActions }}>
        <Header />
        <Box p={6}>
          <ActionList />
        </Box>
      </ActionContext.Provider>
    </>
  );
};

export default Dashboard;
