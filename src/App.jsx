import { useState } from 'react'
import './App.css'
import MainNavBar from './components/MainNavBar'
import AuthContainer from './components/AuthContainer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainNavBar />
      {/* <AuthContainer /> */}
    </>
  )
}
export default App
