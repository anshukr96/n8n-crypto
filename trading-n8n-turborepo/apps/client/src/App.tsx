import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';
import CreateWorkflow from './pages/CreateWorkflow';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import WorkflowDetail from './pages/WorkflowDetail';
import WorkflowExecutions from './pages/WorkflowExecutions';
import { apiClient } from './lib/http';

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      apiClient.setToken(token);
    }
  }, []);

  return (
    <div className="min-h-screen bg-secondary/40">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-workflow" element={<CreateWorkflow />} />
          <Route path="/workflow/:workflowId" element={<WorkflowDetail />} />
          <Route path="/workflow/:workflowId/executions" element={<WorkflowExecutions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
