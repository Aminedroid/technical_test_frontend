import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Users from './components/Users';
import Manage from './components/Manage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route excat path="/users" element={<Users/>} />
          <Route excat path="/manage" element={<Manage/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
