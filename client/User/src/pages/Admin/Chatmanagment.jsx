import React from 'react';
import AdminLayout from '../../component/Layout/AdminLayout';
import Table from '../../component/shared/Table';
import { useState,useEffect } from 'react';
import SERVER_API from '../../lib/consfig';
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { Skeleton } from '@mui/material';
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "groupChat",
    headerName: "GroupChat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "Members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "creator",
    headerName: "Creator",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "totalMembers",
    headerName: "totalMembers",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "totalMessages",
    headerName: "totalMessages",
    headerClassName: "table-header",
    width: 200,
  },
];
const Chatmanagment = () => {
  const [rows,setRows]=useState([]);
  const [data,setData]=useState([])
  const [isLoading,setisLoading]=useState(false)
  useEffect(()=>{
    async function system()
    {
      try{
        setisLoading(true)
      const response=await axios.get(`${SERVER_API}/api/v1/admin/chats`,{
        withCredentials: true,
          headers: {
            "Content-type": "application/json"
          }
      });
      if(response?.data?.transformedChats)
      {
        setData(response.data.transformedChats)
      }
      setisLoading(false)
      toast.success("Data fetched sucessfully")
    }
    catch(err)
    {
      console.log(err)
      toast.error("Error while fetching data")
    }
    }
    system()
  },[])
  useEffect(() => {
    if (data && data.length > 0) { // Added check for data.length
      setRows(
        data.map((i) => ({
          ...i,
          id:i.id,
          Members:i.members.length
        }))
      );
    }
  }, [data]);
  return isLoading?(<Skeleton height={"100vh"}/>):(
    <AdminLayout>
      <Table heading={"all chats"} columns={columns} rows={rows}></Table>
    </AdminLayout>
  );
}

export default Chatmanagment