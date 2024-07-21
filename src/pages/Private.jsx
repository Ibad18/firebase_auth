import React from 'react'
import { signOut } from 'firebase/auth'
import auth from '../../firebase'
import { useNavigate } from 'react-router-dom'
function Private() {
  const navigate = useNavigate();
  const handledLogout = ()=>{
    signOut(auth).then(()=>{
      navigate('/')
      alert("Successfully Logout")
    }).catch(error=>alert(error.message))
  }
  return (
    <div>
      <h1>Welcome to Private Page</h1>
      <button onClick={handledLogout}>Logout</button>
    </div>
  )
}

export default Private