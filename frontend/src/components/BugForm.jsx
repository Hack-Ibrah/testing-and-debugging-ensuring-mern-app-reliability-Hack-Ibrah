import React, { useState } from 'react';
import axios from 'axios';

export default function BugForm({ onAdd, apiBase }){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (title.trim().length < 3) { setError('Title too short'); return; }
    try {
      const res = await axios.post(apiBase + '/bugs', { title, description });
      onAdd(res.data);
      setTitle(''); setDescription('');
    } catch (err) {
      console.error('Submit error', err);
      setError('Failed to create bug');
    }
  };

  return (
    <form onSubmit={submit} aria-label="bug-form">
      <div>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <button type="submit">Report Bug</button>
      {error && <div role="alert">{error}</div>}
    </form>
  );
}
