// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DetailsPage from './pages/DetailsPage';
import Pokedex from './pages/Pokedex';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokemon/:name" element={<DetailsPage />} />
        </Routes>
    </BrowserRouter>
);

export default App;
