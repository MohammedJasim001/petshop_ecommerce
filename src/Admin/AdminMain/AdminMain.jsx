import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import AdminHome from '../Home/AdminHome'

import axios from 'axios'

export const Products =createContext()

const AdminMain = () => {

    
  
  return (
    <div>

        <Routes>
            <Route path='/admin/:url' element={<AdminHome/>}/>
            
            
        </Routes>
    </div>
  )
}

export default AdminMain
