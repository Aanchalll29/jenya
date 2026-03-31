import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import ProductList from './pages/productList.jsx'
import CrudPage from './pages/Crudpage.jsx'
import ProtectedRoute from './components/proroute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={< Login />}/>
      <Route path='/product' element={<ProtectedRoute>< ProductList /> </ ProtectedRoute>} />
      <Route path='/crud' element={<ProtectedRoute><CrudPage /> </ ProtectedRoute>}/>
      <Route path='*' element={< Navigate to = '/login' />}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App
