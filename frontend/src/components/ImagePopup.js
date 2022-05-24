import React from 'react';
function ImagePopup(props) {

    return (
    <article className={`popup popup_add_image ${props.isOpen ? 'overlay' : ''}`}>
    <div className="popup__container popup__container_popup-image">
    <button type="button" className="button button_type_closed button_closed_image opacity" aria-label="закрывает форму" onClick = {props.onClose}></button>
    <img className="popup__image" src={props.selectedCard.img} alt="Карточка с фотографией" ></img>
    <h2 className="popup__subtitle">{props.selectedCard.name}</h2>
    </div>
    </article>
    )
}

export default ImagePopup;

