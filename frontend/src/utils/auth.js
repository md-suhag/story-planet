import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return {
      id: decodedToken.id,
      name: decodedToken.name,
      role: decodedToken.role,
    };
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
};
