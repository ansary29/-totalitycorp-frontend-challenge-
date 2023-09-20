import React from "react";
import { Button, Badge, useColorModeValue } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const CartButton = ({ itemCount }) => {
  // Customize the button style based on your design
  const buttonBgColor = useColorModeValue("blue.500", "blue.300");
  const buttonHoverBgColor = useColorModeValue("blue.600", "blue.400");

  return (
    <Button
      leftIcon={<FaShoppingCart />}
      backgroundColor={buttonBgColor}
      _hover={{ backgroundColor: buttonHoverBgColor }}
      color="white"
    >
      Cart{" "}
      {itemCount > 0 && (
        <Badge
          ml={2}
          fontSize="0.8em"
          colorScheme="red"
          variant="solid"
          borderRadius="full"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;
