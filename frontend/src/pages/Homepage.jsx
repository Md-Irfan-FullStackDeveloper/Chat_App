import { Box, Container, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        p="3"
        boxShadow="dark-lg"
        bg="#2B65EC"
      >
        <Text
          textAlign="center"
          fontWeight="bold"
          fontFamily="Work sans"
          fontSize="1.2rem"
          color="white"
        >
          SkyNet
        </Text>
      </Box>

      <Box
        boxShadow="dark-lg"
        bg="#2B65EC"
        w="100%"
        p={4}
        borderRadius="lg"
        color="white"
      >
        <Tabs variant="soft-rounded" colorScheme="cyan">
          <TabList mb="1rem">
            <Tab color="white" w="50%">
              Login
            </Tab>
            <Tab color="white" w="50%">
              Sign up
            </Tab>
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
