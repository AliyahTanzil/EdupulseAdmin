import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import MainLayout from './components/layout/MainLayout';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="max-w-7xl mx-auto p-8">
              <MainLayout><AdminDashboard /></MainLayout>
            </div>
          } />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;