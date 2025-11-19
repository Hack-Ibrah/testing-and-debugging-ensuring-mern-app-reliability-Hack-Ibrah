import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function App(){
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState(null);

  const fetchBugs = async () => {
    try {
      const res = await axios.get(API + '/bugs');
      setBugs(res.data);
    } catch (err) {
      console.error('Fetch error', err);
      setError('Failed to load bugs');
    }
  };

  useEffect(() => { fetchBugs(); }, []);

  const addBug = (bug) => setBugs(prev => [bug, ...prev]);
  const updateBug = (updated) => setBugs(prev => prev.map(b => b._id === updated._id ? updated : b));
  const deleteBug = (id) => setBugs(prev => prev.filter(b => b._id !== id));

  if (error) return <div>{error}</div>;

  return (
    <ErrorBoundary>
      <div style={{ padding: 20 }}>
        <h1>MERN Bug Tracker</h1>
        <BugForm onAdd={addBug} apiBase={API} />
        <BugList bugs={bugs} onUpdate={updateBug} onDelete={deleteBug} apiBase={API} />
      </div>
    </ErrorBoundary>
  );
}
