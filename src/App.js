import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" 
          element={<Login />}
          />
          <Route path="/cadastro"
          element={<h1>Cadastro</h1>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;