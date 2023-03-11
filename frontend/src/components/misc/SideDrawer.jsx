import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router";
import ChatLoading from "../ChatLoading";
import axios from "axios";
import UserListItem from "../UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingChats, setLoadingChats] = useState(false);
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/", { replace: true });
  };

  // search functionality
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8000/api/user?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };


  const accessChat = async (userId) => {
    try {
      setLoadingChats(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`http://localhost:8000/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChats(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  // console.log(searchResult);
  return (
    <>
      <Flex bg="white" w="100%" p="5px 10px" justify="space-between">
        <Tooltip label="Search users for chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <FiSearch />
            <Text display={["none", "flex"]} px="4">
              Search users
            </Text>
          </Button>
        </Tooltip>

        {/* logo */}
        <Text fontSize="2xl" color="goldenrod" fontWeight="600">
          SkyNet Chat App
        </Text>

        {/* right side notification and profile*/}
        <Box>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.user.name}
                src={user.user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user.user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Flex pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Flex>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChats && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
