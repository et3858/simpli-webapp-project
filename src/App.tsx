import Home from './views/Home';
import Companies from './views/Companies';
import Employees from './views/Employees';
// import './App.css';
import { Routes, Route } from 'react-router-dom';




function App() {
    return (

        <Routes>
            <Route index element={<Home />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/employees" element={<Employees />} />
        </Routes>
    );
}


export default App;
