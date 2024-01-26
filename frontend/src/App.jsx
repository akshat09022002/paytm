import { Signup } from "./routes/signup"
import {useNavigate,BrowserRouter,Routes,Route} from 'react-router-dom'
import {Suspense, lazy} from 'react'
import { Signin } from "./routes/Signin"
import { Dashboard } from "./routes/Dashboard"

function App() {

  return (
    <div> 
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup></Signup>}></Route>
        <Route path="/Signin" element={<Signin></Signin>}></Route>
        <Route path="/Dashboard" element={<Dashboard></Dashboard>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
