const client = ({
   body = null, path = '', method = 'GET'
}) => {
  const baseURL = 'http://localhost:3001';

  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'token-do-caio'
      },
      body: body ? JSON.stringify(body): null
    })
    .then(response => {
      if (response.status !== 204) {
        const data = response.json();
        resolve(data);
      } else {
        resolve(); 
      }
    })
    .catch((error) => reject(error));
  })
}

async function createPhrase({ phrase , priority }) {
  await client({ method: 'POST', path: 'phrase', body: { phrase , priority }})
}

async function listPhrase() {
  return await client({ method: 'GET', path: 'phrase' })
}


async function updatePhrase({ id }) {
  const path = `phrase/${id}`
  await client({ method: 'PUT', path })

}

async function deletePhrase( { id } ) {
  const path = `phrase/${ id }`
  await client({ method: 'DELETE' , path })
}
