import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Resident from './pages/Resident'
import Medication from './pages/Medication'
import Administration from './pages/Administration'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/resident' element={<Resident/>}></Route>
        <Route path='/medication' element={<Medication/>}></Route>
        <Route path='/administration' element={<Administration/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
