import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" 
          element={<h1>Login</h1>}
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