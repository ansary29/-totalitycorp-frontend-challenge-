import React from "react";
import { Stack, Text } from "@chakra-ui/react";

function Logout({ handleLogout }) {
  handleLogout();
  return (
    <Stack spacing={3}>
      <Text fontSize="xl">You have been logged out.</Text>
    </Stack>
  );
}

export default Logout;