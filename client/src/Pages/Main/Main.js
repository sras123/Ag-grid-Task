import React from 'react'
import './main.css';
import Navbar from '../../Components/Navbar'; 

const Main = () => {
  return (
    <div>
      <Navbar/>
    <div className='container'>
        <h1 className='text'>Welcome to the Countries app</h1>
    </div>
    </div>
  )
}

export default Main;