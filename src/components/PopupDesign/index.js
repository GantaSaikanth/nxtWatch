import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import ThemeContext from '../../context/ThemeContext'

import {
  PopupContainer,
  LogoutButton,
  ModalContainer,
  PopupButton,
  ButtonsContainer,
  WarningMessage,
} from './styledComponents'

import 'reactjs-popup/dist/index.css'

const PopupDesign = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <PopupContainer>
            <Popup
              modal
              trigger={
                <LogoutButton type="button" darkMode={isDarkTheme}>
                  Logout
                </LogoutButton>
              }
              className="popup-content"
            >
              {close => (
                <ModalContainer darkMode={isDarkTheme}>
                  <WarningMessage darkMode={isDarkTheme}>
                    Are you sure, you want to logout
                  </WarningMessage>
                  <ButtonsContainer>
                    <PopupButton type="button" outline onClick={() => close()}>
                      Cancel
                    </PopupButton>

                    <PopupButton type="button" onClick={onClickLogout}>
                      Confirm
                    </PopupButton>
                  </ButtonsContainer>
                </ModalContainer>
              )}
            </Popup>
          </PopupContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default withRouter(PopupDesign)
