import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;