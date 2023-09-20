import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Spacer,
  Link as ChakraLink,
  Button,
  HStack,
} from "@chakra-ui/react";
import CartButton from "./CartButton";

const Navbar = ({ loggedIn, handleLogout, cartItems }) => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <Box bg="teal" color="white" p={4} width="100%">
      <Flex alignItems="center">
        <Link to="/">
          <ChakraLink color="white" fontSize="lg" fontWeight="bold">
            Totality E-commerce
          </ChakraLink>
        </Link>
        <Spacer />
        <HStack spacing={4}>
          {loggedIn ? (
            <>
              <Link to="/cart">
                <CartButton
                  itemCount={cartItems.length}
                  onClick={() => toggleCart()}
                />
              </Link>

              <Link to="/logout" onClick={handleLogout}>
                <Button colorScheme="red">Logout</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button colorScheme="teal">Register</Button>
              </Link>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
