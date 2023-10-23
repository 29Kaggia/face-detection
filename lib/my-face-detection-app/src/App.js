import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const API_TOKEN = "e7a3360cb4f0458da6b743633a6f270e";
      const url = "https://api.luxand.cloud/photo/detect";
      const headers = { token: API_TOKEN };

      const response = await axios.post(url, formData, { headers: headers });

      setDetectionResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setDetectionResult('Error occurred during face detection');
    }
  };

  return (
    <div>
      <h1>Face Detection App</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Detect Face</button>
      {detectionResult && <p>{JSON.stringify(detectionResult)}</p>}
    </div>
  );
}

export default App;
