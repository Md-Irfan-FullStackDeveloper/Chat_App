import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        p="3"
        bg="white"
        boxShadow="dark-lg"
      >
        <Text
          textAlign="center"
          fontWeight="bold"
          fontFamily="Work sans"
          color="black"
          fontSize="1.2rem"
        >
          SkyNet
        </Text>
      </Box>

      <Box
        boxShadow="dark-lg"
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1rem">
            <Tab w="50%">Sign up</Tab>
            <Tab w="50%">Login</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
