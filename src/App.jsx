import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Formulario from './pages/Formulario.jsx'
import Galeria from './pages/Galeria.jsx'
import Patrocinio from './pages/Patrocinio.jsx'
import Historia from './pages/Historia.jsx'
import Vinheta from './components/Vinheta';

export default function App() {
  return (
    <>
      <Vinheta />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pedido" element={<Formulario />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/patrocinio" element={<Patrocinio />} />
          <Route path="/historia" element={<Historia />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
