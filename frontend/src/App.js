
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [samples, setSamples] = useState('');
  const [styleSummary, setStyleSummary] = useState(null);
  const [topic, setTopic] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');

  const analyzeStyle = async () => {
    const res = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ samples })
    });
    const data = await res.json();
    setStyleSummary(data);
  };

  const generatePost = async () => {
    const res = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, style: styleSummary })
    });
    const data = await res.json();
    setGeneratedPost(data.post);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">LinkedIn Ghostwriter Agent 🧠</h1>

      <div className="mb-4">
        <h4>Step 1: Paste Sample Posts</h4>
        <textarea
          rows="6"
          className="form-control"
          value={samples}
          onChange={(e) => setSamples(e.target.value)}
          placeholder="Paste 3+ LinkedIn posts here..."
        ></textarea>
        <button className="btn btn-primary mt-2" onClick={analyzeStyle}>
          Analyze Style
        </button>
      </div>

      {styleSummary && (
        <div className="mb-4">
          <h5>Detected Style Summary</h5>
          <pre>{JSON.stringify(styleSummary, null, 2)}</pre>
        </div>
      )}

      {styleSummary && (
        <div className="mb-4">
          <h4>Step 2: Enter Topic</h4>
          <input
            type="text"
            className="form-control"
            placeholder="e.g., Importance of asynchronous work"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button className="btn btn-success mt-2" onClick={generatePost}>
            Generate LinkedIn Post
          </button>
        </div>
      )}

      {generatedPost && (
        <div className="mb-4">
          <h5>Your LinkedIn Post ✍️</h5>
          <div className="bg-light border p-3">
            <pre>{generatedPost}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
