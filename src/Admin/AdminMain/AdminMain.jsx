import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import AdminHome from '../Home/AdminHome'

import axios from 'axios'

export const Products =createContext()

const AdminMain = () => {
    const [data,setData]=useState([])
const [users,setUsers]=useState([]) 
    
  
  return (
    <div>
        <Products.Provider value={{data,users}}>
        <Routes>
            <Route path='/admin/:url' element={<AdminHome/>}/>
            
            
        </Routes>
        </Products.Provider>
    </div>
  )
}

export default AdminMain
