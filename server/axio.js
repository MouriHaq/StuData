axios.get('http://localhost:5000/api/favlinks')
  .then(response => setLinks(response.data))
  .catch(error => console.error('Error fetching favlinks', error));
