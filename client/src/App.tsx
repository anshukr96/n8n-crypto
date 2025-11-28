import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateWorkFlow from './components/CreateWorkFlow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<CreateWorkFlow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
