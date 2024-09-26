import React, { useEffect, useState } from 'react'
import AdminLayout from '../../component/Layout/AdminLayout'
import Table from '../../component/shared/Table'
const Usermanagement = () => {
  const [rows,setRows]=useState();
  useEffect(()=>
  {

  },[]);
  return (
    <AdminLayout>
    <Table/>
    </AdminLayout>
  )
}

export default Usermanagement