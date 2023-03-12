import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import ChatBox from "../components/misc/ChatBox";
import MyChats from "../components/misc/MyChats";
import SideDrawer from "../components/misc/SideDrawer";
import { ChatState } from "../context/ChatProvider";

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false)

  return (
    <Box w="100%">
      {user && <SideDrawer />}

      <Flex w='100%' m='25px 0' p='0 1.5rem' h='85vh' gap='1rem' justify="space-between">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Flex>
    </Box>
  );
};

export default Chatpage;
