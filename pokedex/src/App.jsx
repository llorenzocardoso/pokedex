// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
        </Routes>
    </BrowserRouter>
);

export default App;
