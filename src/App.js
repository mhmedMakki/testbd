//import logo from './images/canary.png';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './home';
import Show from './show';
import Update from './update';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/show" element={<Show />} />
        <Route path='/update' element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
