import { createRoot } from 'react-dom/client'
import './index.css'
import { UserLogin } from './components/login'
import { Homepage } from './components/homepage'
import { Layout } from './components/layout'
import { Dashboard } from './components/dashboard'
import { UserSignUp } from './components/sing-up'
import { BrowserRouter, Routes, Route } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="sign-up" element={<UserSignUp />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
