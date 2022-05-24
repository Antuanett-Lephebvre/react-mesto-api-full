import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [photoName, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ photoName, link });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  return (
    <PopupWithForm 
    isOpen = {props.isOpen}
    closeAllPopups = {props.onClose}
    onSubmit = {handleSubmit}
    formName = "card"
    title = "Новое место"
    buttonText = "Создать"
    children = {
    <>
        <input 
        className="popup__area popup__area_type_name-card"
        type="text" 
        name="name" 
        id="name" 
        placeholder="Название" 
        minLength="2" maxLength="30" 
        required
        value = {photoName || ""}
        onChange={handleChangeName}></input>
        <span id="name-error" className="popup__error"></span>
        <input
        className="popup__area popup__area_type_link"
        type="url"
        name="link"
        id="link"
        placeholder="Ссылка на картинку" 
        required
        value={link || ""}
        onChange={handleChangeLink}></input>
        <span id="link-error" className="popup__error"></span>
    </>
    }
    />
  );
}

export default AddPlacePopup;