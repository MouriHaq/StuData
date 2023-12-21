"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [cityName, setCityName] = useState('');
  const [links, setLinks] = useState([]);
  const [selectedLinkId, setSelectedLinkId] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/links');
      setLinks(response.data);
    } catch (error) {
      console.error('Error fetching links:', error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = {
        name,
        url,
        email,
        contact_number: contactNumber,
        city_name: cityName
      };

      if (selectedLinkId) {
        await axios.put(`http://localhost:5000/links/${selectedLinkId}`, data);
      } else {
        await axios.post('http://localhost:5000/links', data);
      }
      fetchLinks();
      resetForm();
      alert('Data sent successfully!');
    } catch (error) {
      console.error('Error submitting data:', error.message);
    }
  };

  const handleUpdate = (link) => {
    setSelectedLinkId(link.id);
    setName(link.name);
    setUrl(link.url);
    setEmail(link.email || '');
    setContactNumber(link.contact_number || '');
    setCityName(link.city_name || '');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/links/${id}`);
      fetchLinks();
      resetForm();
    } catch (error) {
      console.error('Error deleting link:', error.message);
    }
  };

  const resetForm = () => {
    setSelectedLinkId(null);
    setName('');
    setUrl('');
    setEmail('');
    setContactNumber('');
    setCityName('');
  };

  return (
    <div className='m-5'>
      <h1 className='text-5xl'>Form</h1>

      <ul>
        {links.map((link) => (
          <li key={link.id}>
            {link.name} - {link.url}
            <button onClick={() => handleUpdate(link)}>Update</button>
            <button onClick={() => handleDelete(link.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          URL:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Contact Number:
          <input type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          City Name:
          <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={resetForm}>Cancel</button>
      </div>
    </div>
  );
};

export default App;
