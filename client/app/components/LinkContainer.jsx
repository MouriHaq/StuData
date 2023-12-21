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
    <div className='flex items-center flex-col justify-center font-serif bg-blue-300'>
      <h1 className='text-5xl p-5  text-white'> Student Data Form</h1>

       <ul>
        {links.map((link) => (
          <li key={link.id}>
            {link.name} - {link.url}
            <button onClick={() => handleUpdate(link)}>Update</button>
            <button onClick={() => handleDelete(link.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className=''>
        <label>
          Name:
          <input className='px-10 ml-1 py-3 rounded-lg m-4' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          URL:
          <input className=' px-10 py-3 rounded-lg m-4' type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input className='ml-1 px-10 py-3 rounded-lg m-4' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Contact:
          <input className='ml-2 px-10 py-3 rounded-lg m-4' type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          City:
          <input className='px-10 py-3 rounded-lg m-4' type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} />
        </label>
      </div>
      <div>
        <button className='px-5 py-2 bg-blue-400 rounded-md hover:bg-blue-600 text-white m-4'  onClick={handleSubmit}>Submit</button>
        <button className='px-5 py-2 bg-blue-400 rounded-md hover:bg-blue-600 text-white m-4' onClick={resetForm}>Cancel</button>
      </div>
    </div>
  );
};

export default App;
