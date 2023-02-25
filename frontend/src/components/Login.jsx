import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    setLoading(false);

    if (!email || !password) {
      console.log(email, password);
      toast({
        title: "Please enter all details",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/user/login`,
        {
          email,
          password,
        }
      );

      toast({
        title: "Login successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats", { replace: true });
    } catch (error) {
      toast({
        title: "error occurs",
        description: "error happen while login",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          _placeholder={{ color: "white" }}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            _placeholder={{ color: "white" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              colorScheme={"whiteAlpha"}
              h="1.75rem"
              size="sm"
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        isLoading={loading}
        onClick={handleSubmit}
        mt=""
        w="100%"
        colorScheme="teal"
      >
        Log in
      </Button>

      <Button
        w="100%"
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("123456");
        }}
        colorScheme="red"
        variant="solid"
      >
        Get guest user credentials
      </Button>
    </VStack>
  );
};

export default Login;
