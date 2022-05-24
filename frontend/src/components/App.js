import React from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useEffect, useState } from 'react';
import * as auth from '../utils/auth.js';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [isEditAvatarPopupOpen, setIsOpenAvatar] = React.useState(false);
  const [isAddPlacePopupOpen, setIsOpenPlace] = React.useState(false);
  const [isEditProfilePopupOpen, setIsOpenProfile] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
    const [imgInfoTooltip, setImgInfoTooltip] = React.useState('')
    const [textInfoTooltip, setTextInfoTooltip] = React.useState(' ');
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [headerLink, setHeaderLink] = React.useState('');
  const [addressBar, setAddressBar] = React.useState('');

  const history = useHistory();

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditImagePopup() {
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsOpenAvatar(true);
  }

  function handleEditProfileClick() {
    setIsOpenProfile(true);
  }

  function handleAddPlaceClick() {
    setIsOpenPlace(true);
  }

  function handleClosePopups() {
    setIsOpenProfile(false);
    setIsOpenPlace(false);
    setIsImagePopupOpen(false);
    setIsOpenAvatar(false);
    setIsInfoTooltip(false);
  }

  function handleCardLike({ _id, likes }) {
    const isLiked = likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(_id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((card) => (card._id === _id ? newCard : card))
        );
      })
      .catch((e) => console.log(`Ошибка при постановке лайка: ${e}`));
  }

  function handleCardDelete({ id }) {
    api
      .deleteCard(id)
      .then(() => {
        setCards(cards.filter((card) => card._id != id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        handleClosePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData) {
    api
      .setUserAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
        handleClosePopups();
      })
      .catch((err) => console.log(`Ошибка при обновлении аватара: ${err}`));
  }

  function handleAddPlace(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopups();
      })
      .catch((err) => console.log(`Ошибка при добавлении карточки: ${err}`));
  }
  
  function handleRegister({email, password}) {
    return auth.register(email, password).then((res) => {
      return res
  })

  }

  function handleLogin({email, password}) {
    return auth.authorization(email, password)
            .then((res) => {
              console.log(res)
                if(res.token) {
                    setLoggedIn(true)
                    localStorage.setItem('jwt', res.token)
                    history.push('/')
                }
                return res
            })
  }

  function checkToken () {
    if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt')
        auth.checkingToken(jwt)
            .then((res) => {
                setHeaderLink(res.data.email)
                setLoggedIn(true)
                history.push('/')
            })
            .catch((err)=> {
                console.log(err)
            })
    }
}

React.useEffect (() => {
  checkToken();
}, []);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((e) => console.log(`Ошибка при получении данных: ${e}`));
  }, []);

  return (
    <BrowserRouter>
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path='/sign-in'>
          <Header
          addressBar = '/sign-up'
          headerLink = 'Регистрация'/>
        </Route>
        <Route path='/sign-up'>
          <Header
          addressBar = '/sign-in'
          headerLink = 'Войти'/>
        </Route>
        <Route exact path='/'>
          <Header
          userEmail={headerLink}
          addressBar=''
          headerLink='Выйти'
          setLoggedIn={setLoggedIn}/>
        </Route>
      </Switch>

      <main>
        <Switch>
          <ProtectedRoute exact path = '/'
          component = {Main}
          isLoggedIn={loggedIn}
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditImagePopup={handleEditImagePopup}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          />
          <Route path = '/sign-in'>
            <Login
            onLogin = {handleLogin}
            setHeaderEmail = {setHeaderLink}
            />
          </Route>
          <Route path='/sign-up'>
            <Register
            onRegister={handleRegister}
            setImgInfoTooltip = {setImgInfoTooltip}
            setIsInfoTooltip = {setIsInfoTooltip}
            setTextInfoTooltip = {setTextInfoTooltip}
            />
          </Route>
        </Switch>
      </main>
      {loggedIn && <Footer />}
      <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleClosePopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleClosePopups}
            onAddPlace={handleAddPlace}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleClosePopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            onClose={handleClosePopups}
            formName="confirm"
            title="Вы уверены?"
            buttonText="Да"
          />
          <ImagePopup
            isOpen={isImagePopupOpen}
            selectedCard={selectedCard}
            onClose={handleClosePopups}
          />
          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={handleClosePopups}
            text = {textInfoTooltip}
            img = {imgInfoTooltip}
          />

    </CurrentUserContext.Provider>
    </BrowserRouter>
  )
}
export default App;