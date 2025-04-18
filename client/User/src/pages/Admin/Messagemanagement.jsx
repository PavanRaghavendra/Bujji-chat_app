import React from 'react'
import AdminLayout from '../../component/Layout/AdminLayout'
import axios from 'axios'
import { useEffect,useState } from 'react';
import SERVER_API from '../../lib/consfig';
import { Skeleton } from '@mui/material';
import Table from '../../component/shared/Table';
import {toast} from 'react-hot-toast'
import moment from 'moment'
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "sendername",
    headerName: "senderName",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "chatname",
    headerName: "chatName",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "groupchat",
    headerName: "GroupChat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "attachments",
    headerName: "attachments",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "createdAt",
    headerClassName: "table-header",
    width: 200,
  }
];
const Messagemanagement = () => {
  const [rows,setRows]=useState([]);
  const [data,setData]=useState([])
  const [isLoading,setisLoading]=useState(false)
  useEffect(()=>{
    async function system()
    {
      try{
        setisLoading(true)
      const response=await axios.get(`${SERVER_API}/api/v1/admin/messages`,{
        withCredentials: true,
          headers: {
            "Content-type": "application/json"
          }
      });
      if(response?.data?.transformedMessages)
      {
        setData(response.data.transformedMessages)
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
          createdAt:moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        }))
      );
    }
  }, [data]);
  return isLoading?(<Skeleton height={"100vh"}/>):(
    <AdminLayout>
      <Table heading={"All Messages"} columns={columns} rows={rows}></Table>
    </AdminLayout>
  );
}

export default Messagemanagement