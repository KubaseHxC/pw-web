const get = () =>
  fetch('http://localhost:3001/ingredients', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(response => response.json());

export { get };
