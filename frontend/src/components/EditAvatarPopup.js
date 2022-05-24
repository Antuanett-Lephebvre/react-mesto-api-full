import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputValue = React.useRef();

  React.useEffect(() => {
    inputValue.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: inputValue.current.value });
    // inputValue.current.value = "";
  }

  return (
    <PopupWithForm 
    closeAllPopups = {props.onClose}
    isOpen = {props.isOpen}
    onSubmit = {handleSubmit}
    formName = "avatar"
    title = "Обновить аватар"
    buttonText = "Создать карточку"
    children = {
    <>
        <input 
        className="popup__area popup__area_type_avatar"
         type="url" 
         name="link" 
         id="link_avatar" 
         required
         ref={inputValue}></input>
         <span id="link_avatar-error" className="popup__error"></span>
    </>
    }
    />
  )
}

export default EditAvatarPopup;