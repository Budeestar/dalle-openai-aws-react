import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [imageBase64, setImageBase64] = useState('');

  const generateImage = async () => {
    try {
      const response = await axios.post('[aws-ec2-instanceurl]/generate', {
        prompt,
        size
      });
      setImageBase64(response.data.image_base64);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="App">
      <h1>Image Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
      />
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="1024x1024">1024x1024</option>
        <option value="1792x1024">1792x1024</option>
        <option value="1024x1792">1024x1792</option>
      </select>
      <button onClick={generateImage}>Generate Image</button>
      {imageBase64 && <img src={`data:image/png;base64,${imageBase64}`} alt="Generated" />}
    </div>
  );
}

export default App;
