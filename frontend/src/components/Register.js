import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import union from '../images/union.png';
import cross from '../images/cross.png';

function Register({ onRegister, setIsInfoTooltip, setImgInfoTooltip, setTextInfoTooltip}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleChangeUserName(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit (evt) {
    evt.preventDefault()
    setIsInfoTooltip(true)
    onRegister({email, password})
        .then(() => {
            
                setEmail('')
                setPassword('')
                setTextInfoTooltip('Вы успешно зарегестрировались')
                setImgInfoTooltip(union)
                history.push('/sign-in')
        })
        
        .catch((err) => {
            setImgInfoTooltip(cross)
            setTextInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.')
            console.log(err)
        })
    }

  return (
    <div className="login">
      <h2 className="login__title"> Регистрация </h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__input-container">
          <input
            type="email"
            id="email"
            className="login__input"
            value={email}
            placeholder="Email"
            onChange={handleChangeUserName}
          />
          <input
            type="password"
            id="password"
            className="login__input"
            value={password}
            placeholder="Пароль"
            onChange={handleChangePassword}
          />
        </fieldset>
        <button type="submit" className="login__button">
          Зарегистрироваться
        </button>
      </form>

      <p className="login__link">
        Уже зарегистрированы?
        <Link to="/sign-in" className="login__link">
          {' '}
          Войти{' '}
        </Link>
      </p>
    </div>
  );
}

export default Register;
