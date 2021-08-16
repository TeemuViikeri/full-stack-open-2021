import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleUserLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <form id='inputForm' data-cy='inputForm' onSubmit={handleUserLogin}>
        <div>
          <label>
            username
            <input
              type='text'
              data-cy='input-username'
              name='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='text'
              data-cy='input-password'
              name='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <input type='submit' data-cy='login-submit' value='login' />
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleUserLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default LoginForm
