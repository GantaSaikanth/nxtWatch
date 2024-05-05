import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  LoginContainer,
  LoginFormContainer,
  ImageContainer,
  InputLabelContainer,
  Label,
  Logo,
  CheckBoxLabelContainer,
  InputBox,
  CheckBox,
  LoginButton,
  ErrorMsg,
} from './styledComponents'

import ThemeContext from '../../context/ThemeContext'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showPass: false,
    onShowErrorMsg: false,
    errorMsg: '',
  }

  successPage = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failurePage = errorMsg => {
    this.setState({onShowErrorMsg: true, errorMsg})
  }

  onSubmitPage = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.successPage(data.jwt_token)
    } else {
      this.failurePage(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({
      showPass: !prevState.showPass,
    }))
  }

  render() {
    const {username, password, showPass, onShowErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <LoginContainer>
              <LoginFormContainer
                darkMode={isDarkTheme}
                onSubmit={this.onSubmitPage}
              >
                <ImageContainer>
                  <Logo
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                </ImageContainer>
                <InputLabelContainer>
                  <Label darkMode={isDarkTheme} htmlFor="username">
                    USERNAME
                  </Label>
                  <InputBox
                    type="text"
                    id="username"
                    placeholder="Username"
                    onChange={this.onChangeUsername}
                    value={username}
                  />
                </InputLabelContainer>
                <br />

                <InputLabelContainer>
                  <Label darkMode={isDarkTheme} htmlFor="password">
                    PASSWORD
                  </Label>
                  <InputBox
                    type={showPass ? 'text' : 'password'}
                    id="password"
                    placeholder="Password"
                    onChange={this.onChangePassword}
                    value={password}
                  />
                </InputLabelContainer>

                <br />
                <CheckBoxLabelContainer>
                  <CheckBox
                    type="checkbox"
                    id="showPassword"
                    onClick={this.onClickShowPassword}
                  />
                  <Label darkMode={isDarkTheme} htmlFor="showPassword">
                    Show Password
                  </Label>
                </CheckBoxLabelContainer>

                <br />
                <LoginButton type="submit">Login</LoginButton>
                {onShowErrorMsg && <ErrorMsg>*{errorMsg}</ErrorMsg>}
              </LoginFormContainer>
            </LoginContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LoginRoute
