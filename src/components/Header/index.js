import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import PopupDesign from '../PopupDesign'
import {Navbar, Image, ButtonDiv, Button, Images} from './styledComponents'

const Header = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value

      const onClickTheme = () => {
        toggleTheme()
      }
      const websiteLogo = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const themeImageURL = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'

      return (
        <Navbar darkMode={isDarkTheme}>
          <Link to="/">
            <Image src={websiteLogo} alt="website logo" />
          </Link>
          <ButtonDiv>
            <Button
              aria-label="theme"
              type="button"
              onClick={onClickTheme}
              data-testid="theme"
            >
              <Images src={themeImageURL} />
            </Button>
            <Images
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <br />
            <PopupDesign />
          </ButtonDiv>
        </Navbar>
      )
    }}
  </ThemeContext.Consumer>
)

export default Header
