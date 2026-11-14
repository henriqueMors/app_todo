import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login.jsx';
import { Cadastro } from './components/Cadastro.jsx';
import { Home } from './components/Home.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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