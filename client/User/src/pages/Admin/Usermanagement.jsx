import React, { useEffect, useState } from 'react'
import AdminLayout from '../../component/Layout/AdminLayout'
import Table from '../../component/shared/Table'
import SERVER_API from '../../lib/consfig';
import axios from 'axios'
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
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];
const Usermanagement =() => {
  const [rows,setRows]=useState([]);
  const [data,setData]=useState([])
  const [isLoading,setisLoading]=useState(false)
  useEffect(()=>{
    async function system()
    {
      try{
        setisLoading(true)
      const response=await axios.get(`${SERVER_API}/api/v1/admin/users`,{
        withCredentials: true,
          headers: {
            "Content-type": "application/json"
          }
      });
      if(response?.data?.transformedUsers)
      {
        setData(response.data.transformedUsers)
      }
      setisLoading(false)
    }
    catch(err)
    {
      console.log(err)
    }
    }
    system()
  },[])
  useEffect(() => {
    if (data && data.length > 0) { // Added check for data.length
      setRows(
        data.map((i) => ({
          ...i,
          id: i.id
        }))
      );
    }
  }, [data]);
  return isLoading?(<Skeleton height={"100vh"}/>):(
    <AdminLayout>
      <Table heading={"All users"} columns={columns} rows={rows}></Table>
    </AdminLayout>
  )
}

export default Usermanagement