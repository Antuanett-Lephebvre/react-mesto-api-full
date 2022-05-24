import React from 'react';


function InfoTooltip (props) {
    return (
        <article className={`popup_add_feedback ${props.isOpen ? 'overlay' : ''}`}>
                <div className="popup__container">
                    <button type="button" className= "button button_type_closed button_closed_feedback opacity" aria-label="Закрыть попап" onClick={props.onClose}></button>
                    <fieldset className="popup__input-container popup__input-container_white-theme">
                    <img src={props.img} alt="" style={{width:'120p', height: '120px', display: 'flex', margin: '60px auto 32px'}}/>
                    <h2 className="popup__title" 
                    style={{fontWeight: '900', margin: 'auto',
                    marginTop: '40px', fontSize: '24px',
                    lineHeight: '29px', textAlign: 'center'}}>
                    {props.text}</h2>
                    </fieldset>
                </div>
        </article> 
    )
}

export default InfoTooltip