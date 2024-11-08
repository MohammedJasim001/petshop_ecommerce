

import { Toaster } from 'sonner';
import './App.css';
import Main from './Components/MainPage/Main';

import { lazy, useEffect, useState } from 'react';
const Admins = lazy(()=>import('./Admin/AdminMain/AdminMain'))


function App() {

  const [adm,setAdm]=useState()
  useEffect(()=>{
      const admin = localStorage.getItem("admin")
      if(admin){
       setAdm(admin) 
      }
  },[])

  return (
    <div className="App">
<Toaster richColors position='top-right'
   toastOptions={{
    style: {
      fontSize: '1.2rem',
      padding: '16px', 
    },
  }}/>
{adm &&
    <Admins/> }
         
    <Main/>
     
     
    </div>
  );
}

export default App;
