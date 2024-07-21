import { useEffect, useState } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Private from './pages/Private.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import auth from '../firebase.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'
// import { Spinner } from 'react-bootstrap'
const App = ()=>{
  // const [isFetching, setIsFetching] = useState(true)
  const [user, setUser] = useState();
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      setUser(user)
      // setIsFetching(false)
    })
    return () => unsubscribe();
  },[])
  // if(isFetching){
  //   return <Spinner animation='border'/>
  // }
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/private' element = {<ProtectedRoute user={user}>{<Private/>}</ProtectedRoute>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App