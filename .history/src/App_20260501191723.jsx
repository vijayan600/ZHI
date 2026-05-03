import './styles/global.css';
import './styles/responsive.css';
import Navbar from './components/Navbar';
import Home   from './pages/Home';

export default function App() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}