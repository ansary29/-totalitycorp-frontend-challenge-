import "./App.css";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import { CartProvider } from "./Components/CartContext"
import { ChakraProvider, Container, CSSReset } from "@chakra-ui/react";
import Register from "./Components/Register";
import Login from "./Components/Login";
// import Home from "./Components/Home";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Logout from "./Components/Logout";
import Cart from "./Components/Cart";
import ProductListing from "./Components/ProductList";
import Checkout from "./Components/Checkout";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
      console.log("Updated cart:", updatedCart);
    } else {
      const newCartItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
      console.log("Added to cart:", newCartItem);
    }
  };
  // if (!isAuthenticated) {
  //   navigate("/register");
  // }

  const handleRegister = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    } else {
      localStorage.setItem("username", email);
      localStorage.setItem("password", password);
      // setIsAuthenticated(true);
      navigate("/login");
      setEmail("");
      setPassword("");
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (email === storedUsername && password === storedPassword) {
    
      toast.success("Login successful!");
      setLoggedIn(true);
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    // setIsAuthenticated(false);
    setLoggedIn(false);
    navigate("/login");
    console.log("click");
  };
  return (
    <ChakraProvider>
      <CSSReset />

      <Navbar
        loggedIn={loggedIn}
        handleLogout={handleLogout}
        cartItems={cartItems}
      />

      <Container maxW="container.md" p={4}>
        <Routes>
          <Route
            path="/register"
            element={
              <Register
                // isAuthenticated={isAuthenticated}
                error={error}
                handleRegister={handleRegister}
                setEmail={setEmail}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                setError={setError}
              />
            }
          />

          <Route
            path="/login"
            element={
              <Login
                // isAuthenticated={isAuthenticated}
                handleLogin={handleLogin}
                setEmail={setEmail}
                setPassword={setPassword}
                error={error}
                setError={setError}
              />
            }
          />
          {loggedIn ? (
            <>
              <Route
                path="/"
                element={
                  <ProductListing
                    cartItems={cartItems}
                    addToCart={addToCart}
                    setCartItems={setCartItems}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    calculateTotal={calculateTotal}
                  />
                }
              />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/logout"
                element={<Logout handleLogout={handleLogout} />}
              />
            </>
          ) : (
            <Route
              path="/*"
              element={
                <Navigate to="/login" error={error} setError={setError} />
              }
            />
          )}
        </Routes>
      </Container>
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;
