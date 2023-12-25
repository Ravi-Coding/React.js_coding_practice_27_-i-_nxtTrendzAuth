// Write your JS code here
import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '', // step 1
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value}) // step 1.i if change username and password then updating
  }

  onChangePassword = event => {
    this.setState({password: event.target.value}) // step 1.ii
  }

  onSubmitSuccess = () => {
    const {history} = this.props

    history.replace('/') // step 8 ,by history.replace() forward and backward in the browse and the url will change
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    // step 4 ,submitForm and preventDefault only
    event.preventDefault()
    // step 5  Accessing username and password
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login' // step 6 make apis
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options) // step 7
    const data = await response.json() // step 7 after this check console.log(response) for jwt response ,if response ok then ,we will create onSubmitSuccess ,see above
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  /* step 1.vi renderPasswordField */
  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  /* step 1.iv renderUserNamefield */
  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          {/* step 3  , for sumbit onsubmit ,event listener ,we are defining above SubmitForm ,listener */}
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          {/* step 1.iii renderUserNamefield */}
          <div className="input-container">{this.renderUsernameField()}</div>
          {/* step 1.v renderPasswordField */}
          <div className="input-container">{this.renderPasswordField()}</div>
          {/* step 2 ,type = submit */}
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
