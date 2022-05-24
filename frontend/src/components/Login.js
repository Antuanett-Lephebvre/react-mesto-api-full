import React from 'react';
import * as auth from '../utils/auth.js';
import { useHistory } from 'react-router-dom';

function Login({onLogin, setHeaderEmail}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleChangeUserName(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({email, password})
    .then((res) => {
      if (res) {
        setHeaderEmail('')
        setPassword ('')
        history.push('/')
        setHeaderEmail(email)
      }
    })
    .catch((err) => console.log(err))
  }

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
        history.push('/');
    }
}, [])

  return (
    <div className="login">
      <h2 className="login__title"> Вход </h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          id="email"
          className="login__input"
          value={email}
          placeholder="Email"
          onChange={handleChangeUserName}
        />
        <input
          id="password"
          className="login__input"
          value={password}
          placeholder="Пароль"
          onChange={handleChangePassword}
        />
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
