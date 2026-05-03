import './styles/global.css';
import './styles/responsive.css';
import Navbar from './components/Navbar';
import Home   from './pages/Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}