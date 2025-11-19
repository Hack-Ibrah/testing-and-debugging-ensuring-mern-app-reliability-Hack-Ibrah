import React from 'react';
import axios from 'axios';

function BugItem({ bug, onUpdate, onDelete, apiBase }){
  const toggle = async () => {
    // intentional bug: status toggling logic has a mistake (teaching purpose)
    try {
      const newStatus = bug.status === 'open' ? 'resolved' : 'open';
      const res = await axios.put(apiBase + '/bugs/' + bug._id, { status: newStatus });
      onUpdate(res.data);
    } catch (err) {
      console.error('Toggle error', err);
    }
  };

  const remove = async () => {
    try {
      await axios.delete(apiBase + '/bugs/' + bug._id);
      onDelete(bug._id);
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  return (
    <li>
      <strong>{bug.title}</strong> - <em>{bug.status}</em>
      <button onClick={toggle}>Toggle</button>
      <button onClick={remove}>Delete</button>
    </li>
  );
}

export default function BugList({ bugs, onUpdate, onDelete, apiBase }){
  if (!bugs || bugs.length === 0) return <div>No bugs reported yet.</div>;
  return (
    <ul>
      {bugs.map(b => <BugItem key={b._id} bug={b} onUpdate={onUpdate} onDelete={onDelete} apiBase={apiBase} />)}
    </ul>
  );
}
