// src/DashboardForm.js
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [file, setFile] = useState(null);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('There was an error!', error);
      alert('There was an error submitting the form.');
    }
  };

  return (
    <div className="dashboard-form">
      <h1>Healthcare Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="file">Upload File</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Dashboard;
