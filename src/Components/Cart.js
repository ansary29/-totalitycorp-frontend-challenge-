import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Checkout from "./Checkout";
import CartButton from "./CartButton"; 

const Cart = ({ cartItems, calculateTotal, setCartItems }) => {
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const total = calculateTotal();

  if (!cartItems || cartItems.length === 0) {
    return (
      <VStack p={4} align="start">
        <Heading as="h2">Shopping Cart</Heading>
        <Text>Your cart is empty.</Text>
        <Link to="/">Back to Products</Link>
      </VStack>
    );
  }

  const CartItem = ({
    item,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  }) => (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      mb={4}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Heading as="h3" size="md" mb={2}>
        {item.title}
      </Heading>
      <Image src={item.image} alt="productimage" boxSize="200px" />
      <Text>Price: ${item.price}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Button
        colorScheme="teal"
        size="sm"
        mt={2}
        onClick={() => increaseQuantity(item.id)}
      >
        +
      </Button>
      <Button
        colorScheme="teal"
        size="sm"
        mt={2}
        onClick={() => decreaseQuantity(item.id)}
      >
        -
      </Button>
      <Button
        colorScheme="red"
        size="sm"
        mt={2}
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </Button>
    </Box>
  );

  return (
    <VStack p={4} align="start">
      <Heading as="h2">Shopping Cart</Heading>
      <CartButton itemCount={cartItems.length} /> 
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      ))}

      <Flex justify="space-between" alignItems="center" mt={4}>
        <Text>Total: ${total}</Text>
        <Spacer />
        <Button as={Link} to="/checkout" colorScheme="teal" onClick={() => setIsCheckoutVisible(true)}>
          Checkout
        </Button>
      </Flex>

      {isCheckoutVisible && (
        <Checkout
          cartItems={cartItems}
          calculateTotal={calculateTotal}
          setCartItems={setCartItems}
        />
      )}
    </VStack>
  );
};

export default Cart;
