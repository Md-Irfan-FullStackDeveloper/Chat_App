import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import ChatBox from "../components/misc/ChatBox";
import MyChats from "../components/misc/MyChats";
import SideDrawer from "../components/misc/SideDrawer";
import { ChatState } from "../context/ChatProvider";

const Chatpage = () => {
  const { user } = ChatState();

  return (
    <Box w="100%">
      {user && <SideDrawer />}

      <Flex border="1px solid red" justify="space-between">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Flex>
    </Box>
  );
};

export default Chatpage;
