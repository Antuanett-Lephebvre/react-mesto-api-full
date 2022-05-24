import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Main(props) {
  const handleCardClick = props.onCardClick;
  const onEditImagePopup = props.onEditImagePopup;
  const context = React.useContext(CurrentUserContext);

  return (
    <main className="root">
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__photo"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${context.avatar})` }}
          ></button>
          <div className="profile__information">
            <div className="profile__info">
              <h1 className="profile__title">{context.name}</h1>
              <p className="profile__subtitle">{context.about}</p>
            </div>
            <button
              type="button"
              className="button button_type_edit opacity"
              aria-label="открывает форму редактирования"
              onClick={props.onEditProfile}
            ></button>
          </div>
        </div>
        <div className="profile__right">
          <button
            type="button"
            className="button button_type_add opacity"
            aria-label="открывает форму добавления фото"
            onClick={props.onAddPlace}
          ></button>
        </div>
      </section>
      <section className="photo-grid">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              {...card}
              onCardClick={handleCardClick}
              onEditImagePopup={onEditImagePopup}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
