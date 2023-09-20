import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Image,
  Text,
  Button,
  Grid,
  GridItem,
  Select,
} from "@chakra-ui/react";

const ProductListing = ({addToCart}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState("price");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        let sortedProducts = response.data;
        console.log("sortedProducts",sortedProducts);
        console.log("sortedProducts",sortedProducts);
        if (sortBy === "price") {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === "category") {
          sortedProducts.sort((a, b) => a.category.localeCompare(b.category));
        } else if (sortBy === "rating") {
          sortedProducts.sort((a, b) => b.rating - a.rating);
        }

        setProducts(sortedProducts);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy]);

  
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <Select placeholder="Sort by" onChange={(e) => setSortBy(e.target.value)}>
        <option value="price">Price</option>
        <option value="category">Category</option>
        <option value="rating">Rating</option>
      </Select>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
        {products.map((product) => (
          <GridItem width="100%" key={product.id}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              <Image
                src={product.image}
                alt={product.title}
                height="100%"
                objectFit="cover"
              />
              <Box p="4" flex="1">
                <Text fontSize="sm" color="gray.500">
                  {product.category}
                </Text>
                <Text fontWeight="semibold" fontSize="lg" flex="1">
                  {product.title}
                </Text>
                <Text fontSize="sm">${product.price}</Text>
                <Button
                  colorScheme="blue"
                  mt="auto"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default ProductListing;
