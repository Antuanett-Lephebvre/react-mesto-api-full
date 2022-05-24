import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
   const name = props.name;
   const link = props.link;
   const likes = props.likes;
   const _id = props._id;
   const onCardClick = props.onCardClick;
   const onEditImagePopup = props.onEditImagePopup;
   const context = React.useContext(CurrentUserContext);
   const isOwn = props.owner._id === context._id;
   const cardDeleteButtonClassName = (
      ` ${isOwn ? 'button button_type_delete opacity' : ''}`
   )
   const isLiked = likes.some(i => i._id === context._id);
   const cardLikeButtonClassName = (`like-container__like opacity opacity_like ${isLiked ? 'like-container__like_active' : ''}`)
   
   function onClick() {
      handleClick();
      onEditImagePopup()
   }

   function handleClick() {
      onCardClick({
        id: _id,
        img: link,
        name: name,
      })
      
   }

   function handleLikeClick() {
      props.onCardLike({
         _id: _id,
        likes: likes,
      })
   }

   function handleDeleteClick() {
      props.onCardDelete({
         id: _id,
      })
   }
   return (
    <article className="card">
    <img className="card__photo opacity_button" src={link} onClick = {onClick} alt="фото пейзаж"></img>
    <button type="button" className = {cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="удаляет карточку"></button>
    <div className="card__container">
    <h2 className="card__title">{name}</h2>
    <div className="like-container">
    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
    <h3 className="like-container__number">{likes.length}</h3>
    </div>
    </div>
    </article>
   )
}

export default Card;