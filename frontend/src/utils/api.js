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

    getUserInfo() {
        return fetch(this.url+'/users/me', {
            headers: this.headers,
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(this.url+'/cards', {
            headers: this.headers,
        })
        .then(this._checkResponse)
    }

    changeLikeCardStatus(_id, isLiked) {
        return fetch(`${this.url}/cards/likes/${_id}`, isLiked ?
        {
            method: 'PUT',
            headers: this.headers,
        }
         : 
         {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify({
                _id: _id,
            })
        }
        ).then(this._checkResponse)
    }

    deleteCard(id) {
        this._id = id;
         return fetch(this.url+'/cards/'+ this._id, {
             method: 'DELETE',
             headers: this.headers,
             body: JSON.stringify({
                 _id: this._id,
             })
         }).then(this._checkResponse)
     }
     
     setUserInfo(data) {
         console.log(data)
        return fetch(this.url+'/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._checkResponse);
        }

        setUserAvatar(data) {
            return fetch(this.url+'/users/me/avatar', {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    avatar: data.avatar,
                })
            })
            .then(this._checkResponse);
        }

        addCard(card) {
            console.log(card);
            return fetch(this.url+'/cards', {
                method: 'POST',
                headers: this.headers,
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
    url: 'https://api.ekatant.nomoredomains.work',

    headers: {
        'Content-Type': 'application/json'
    } 
})



export default api;

