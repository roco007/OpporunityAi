import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import IdeaDetail from './pages/IdeaDetail';
import Generate from './pages/Generate';
import Compare from './pages/Compare';
import Saved from './pages/Saved';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/idea/:id" element={<IdeaDetail />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
