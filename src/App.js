import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/home';
import About from './pages/about';
import Donation from './pages/donation';
import Programs from './pages/programs';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/donation" element={<Donation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
