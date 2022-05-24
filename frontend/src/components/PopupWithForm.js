function PopupWithForm (props) {
    return (
        <article className={`popup popup_add_${props.formName}${props.isOpen ? 'overlay' : ''}`}>
            <div className="popup__container">
            <button 
            type="button" 
            className={`button button_type_closed button_closed_${props.formName} opacity"`}
            aria-label="закрывает форму"
            onClick={props.closeAllPopups}></button>
            <form 
            className={`popup__form popup__form_${props.formName}`} 
            name={`${props.formName}_form`}
            onSubmit = {props.onSubmit}>
            <h2 className="popup__title">{props.title}</h2>
            <fieldset className="popup__input-container">
                {props.children}
                <button type="submit" className="button button_type_saved button_type_submit opacity opacity_button" aria-label="сохраняет изменения">{props.buttonText}</button>
            </fieldset>
            </form>
            </div>
        </article>
    )
}

export default PopupWithForm