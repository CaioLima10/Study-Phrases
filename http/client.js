/**
 * 
 * @param { { 
 *  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
 *  path: 'string' ,
 *  body: Object | null | undefined
 *  } } param0 
 * @returns 
 */
const client = ({
   body = null, path = '', method = 'GET'
}) => {
  const baseURL = 'http://localhost:3000';

  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'token-do-caio'
      },
      body: body ? JSON.stringify(body): null
    })
    .then(response =>  response.json())
    .then(data => resolve(data))
    .catch(error => {
      reject(error)
    });
  })
}

async function createPhrase({ phrase }) {
  await client({ method: 'POST', path: 'phrase', body: { phrase }})
}

async function listPhrase() {
  return await client({ method: 'GET', path: 'phrase' })
}

/**
 * 
 * @param {{id: string}} param0 
 * @returns 
 */
async function updatePhrase({ id }) {
  const path = `phrase/${id}`
  await client({ method: 'PUT', path })
}

/**
 * 
 * @param {{id: string}} param0 
 * @returns 
 */
async function deletePhrase({ id }) {
  const path = `phrase/${id}`
  await client({ method: 'DELETE', path })
}
