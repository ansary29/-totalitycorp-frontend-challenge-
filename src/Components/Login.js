import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const Login = ({ handleLogin, setEmail, setPassword, error, user }) => {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          border={"2px solid grey"}
        >
          {user ? (
            <>
              <Avatar src={user.avatar} name={user.name} size="xl" />
              <Text>Welcome, {user.name}!</Text>
            </>
          ) : (
            <Stack spacing={4}>
              <FormControl
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              >
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              >
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              {error && <Text>{error}</Text>}
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>
                    Don't have an account? <Link to="/register">Register</Link>
                  </Text>
                </Stack>
                <Button
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={(e) => handleLogin(e)}
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          )}
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
