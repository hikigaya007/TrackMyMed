import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Resident from './pages/Resident'
import Medication from './pages/Medication'
import Administration from './pages/Administration'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/PrivateRoute'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<PrivateRoute/>}>
          <Route path='/resident' element={<Resident/>}></Route>
          <Route path='/medication' element={<Medication/>}></Route>
          <Route path='/administration' element={<Administration/>}></Route>
        </Route>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/sign-up' element={<SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
