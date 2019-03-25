const get = () =>
    fetch('http://localhost:3001/ingredients', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());

const create = topping =>
    fetch('http://localhost:3001/ingredients', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(topping)
    })
        .then(response => response.json())
        .catch(err => new Error({ message: err }));

export { get, create };
