import React, { Profiler } from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const context = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(context.name);
        setDescription(context.about);
    },[context, isOpen])
    
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        })
    }

return (
    <>
    <PopupWithForm
            closeAllPopups = {onClose}
            isOpen = {isOpen}
            onSubmit = {handleSubmit}
            formName = "profile"
            title = "Редактировать профиль"
            buttonText = "Сохранить"
            children = {
                <>
            <input className="popup__area popup__area_type_name" 
            id="author"
            type="text" 
            minLength="2" maxLength="40" 
            value = {name || ""} 
            onChange = {handleChangeName} 
            placeholder = "Имя"
            name="name" ></input>
            <span id="author-error" className="popup__error"></span>
            <input className="popup__area popup__area_type_about"
            type="text"
            id="about" 
            minLength="2" maxLength="200" 
            value = {description || ""} 
            onChange = {handleChangeDescription} 
            placeholder = "О себе"
            name="about"></input>
            <span id="about-error" className="popup__error"></span>
            </>
            }
            />
            </>
)
}

export default EditProfilePopup