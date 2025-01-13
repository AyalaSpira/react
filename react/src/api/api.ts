import axios from 'axios';

const API_URL = "http://localhost:3000/api/user";

export const loginUser = async (name: string, password: string) => {
  try {
    console.log("loginUser", name, password);
    
    const response = await axios.post(`${API_URL}/login`, { name, password },
    {
     
    });
    return response.data.user;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const registerUser = async (userData: any) => {
  console.log("registerUser", userData);
  
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};


export const updateUser = async (id: number, userData: any) => {
  console.log("updateUser", id, userData);
  
  try {
    const response = await axios.put(`${API_URL}`, userData, {headers:{'user-id':id}});
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Update failed", error);
    throw error;
  }
};







