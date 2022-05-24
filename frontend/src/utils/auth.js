

export const baseUrl = 'https://api.ekatant.nomoredomains.work';
//export const baseUrl = 'http://localhost:3000';


function _checkResponsive (res) {
  if (res.ok) {
        return res.json()
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export function register (email, password) {
    return fetch (`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": email,
          "password": password
          
        })
    })
    .then(_checkResponsive)

  };
    
    


export function authorization (identifier, password) {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        "email": identifier,
        "password": password
          
      })
    })
      .then(_checkResponsive)
      
      .then((data) => {
          if (data.token){            
            localStorage.setItem('jwt', data.token)
            return data;
          } 
      })
  };

  export function checkingToken (token) {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(_checkResponsive)
    
  }
