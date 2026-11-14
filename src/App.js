import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login.jsx';
import { Cadastro } from './components/Cadastro.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" 
            element={<Login />}
          />
          <Route path="/cadastro"
            element={<Cadastro />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;