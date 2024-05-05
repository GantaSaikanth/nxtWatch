import Header from '../Header'
import {
  NotFoundContainer,
  NotFoundContentContainer,
  NotFoundImage,
  NotFoundText,
  SorryMsg,
} from './styledComponents'
import ThemeContext from '../../context/ThemeContext'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const imageUrk = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <>
          <Header />
          <NotFoundContainer darkMode={isDarkTheme} data-testid="not-found">
            <NotFoundContentContainer>
              <NotFoundImage src={imageUrk} alt="not found" />
              <NotFoundText darkMode={isDarkTheme}>Page Not Found</NotFoundText>
              <SorryMsg darkMode={isDarkTheme}>
                We are sorry, the page you requested could not be found.
              </SorryMsg>
            </NotFoundContentContainer>
          </NotFoundContainer>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
