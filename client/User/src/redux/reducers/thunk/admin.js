import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import SERVER_API from "../../../lib/consfig";
const adminValidation = createAsyncThunk(
  "admin/login",
  async (secretKey, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-type": "application/json"
        }
      };
      const secretKeyValue = typeof secretKey === 'string' 
      ? secretKey 
      : secretKey?.value || '';
      const response =await axios.post(`${SERVER_API}/api/v1/admin/verify`,{secretKey:secretKeyValue},config)
      
      return response.data.msg;
    } catch (err) {
        console.log(err);
        // Added fallback message in case response.data.message is undefined
        return rejectWithValue(err.response?.data?.msg || "Authentication failed");
    }
  }
);
const getAdmin = createAsyncThunk(
    "admin",
    async (_, { rejectWithValue }) => { // Fixed parameter destructuring
      console.log("into thunk admin");
      try {
        const config = {
          withCredentials: true,
          headers: {
            "Content-type": "application/json"
          }
        };
        const response = await axios.get(
          `${SERVER_API}/api/v1/admin`, 
          config
        );
        
        console.log(response);
        return response.data.success;
      } catch (err) {
        console.log(err);
        return rejectWithValue(err.response?.data?.msg || "Internal error");
      }
    }
  );
  
  const logoutAdmin = createAsyncThunk(
    "admin/logout",
    async (_, { rejectWithValue }) => { // Fixed parameter destructuring
      try {
        const config = {
          withCredentials: true,
          headers: {
            "Content-type": "application/json"
          }
        };
        
        // Moved config from request body to third parameter
        const response = await axios.post(
          `${SERVER_API}/api/v1/admin/logout`,
          {}, // Empty request body
          config
        );
        
        return response.data.success;
      } catch (err) {
        return rejectWithValue(err.response?.data?.msg || "Internal error");
      }
    }
  );

export { adminValidation,getAdmin,logoutAdmin};