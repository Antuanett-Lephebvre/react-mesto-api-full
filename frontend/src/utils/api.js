class Api {
    constructor(options) {
      this.url = options.url;
      this.headers = options.headers;
    }

    _checkResponse(res) {  
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Произошла ошибка со статус-кодом ${res.status}`)
        
    }

    getUserInfo(token) {
        return fetch(this.url+'/users/me', {
            headers: { ...this.headers, authorization: token}
        })
        .then(this._checkResponse)
    }

    getInitialCards(token) {
        return fetch(this.url+'/cards', {
            headers: { ...this.headers, authorization: token}
        })
        .then(this._checkResponse)
    }

    changeLikeCardStatus(_id, isLiked, token) {
        return fetch(`${this.url}/cards/${_id}/likes/`, isLiked ?
        {
            method: 'PUT',
            headers: { ...this.headers, authorization: token}
        }
         : 
         {
            method: 'DELETE',
            headers: { ...this.headers, authorization: token},
            body: JSON.stringify({
                _id: _id,
            })
        }
        ).then(this._checkResponse)
    }

    deleteCard(id, token) {
        this._id = id;
         return fetch(this.url+'/cards/'+ this._id, {
             method: 'DELETE',
             headers: { ...this.headers, authorization: token},
             body: JSON.stringify({
                 _id: this._id,
             })
         }).then(this._checkResponse)
     }
     
     setUserInfo(data, token) {
         console.log(data)
        return fetch(this.url+'/users/me', {
            method: 'PATCH',
            headers: { ...this.headers, authorization: token},
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._checkResponse);
        }

        setUserAvatar(data, token) {
            return fetch(this.url+'/users/me/avatar', {
                method: 'PATCH',
                headers: { ...this.headers, authorization: token},
                body: JSON.stringify({
                    avatar: data.avatar,
                })
            })
            .then(this._checkResponse);
        }

        addCard(card, token) {
            console.log(card);
            return fetch(this.url+'/cards', {
                method: 'POST',
                headers: { ...this.headers, authorization: token},
                body: JSON.stringify({
                    name: card.photoName,
                    link: card.link,
                    currentId: card.currentId
                })
            })
            .then(this._checkResponse)
        }
}

const api = new Api({
    //url: 'http://localhost:3000',
    url: 'https://api.ekatant.nomoredomains.work',
    headers: {
        'Content-Type': 'application/json'
    } 
})



export default api;

