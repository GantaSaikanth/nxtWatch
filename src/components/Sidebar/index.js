import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome, AiOutlineHome} from 'react-icons/ai'
import {HiOutlineFire, HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import ThemeContext from '../../context/ThemeContext'
import {
  SideBarContainer,
  OptionItem,
  OptionsContainer,
  ContactUsContainer,
  ContactUsHeading,
  SocialMediaContainer,
  SocialMediaIcon,
  ContactUsDescription,
} from './styledComponents'
import './index.css'

class Sidebar extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const textClassName = isDarkTheme ? 'dark' : 'light'

          return (
            <SideBarContainer darkMode={isDarkTheme}>
              <OptionsContainer>
                <Link to="/" className={`link-item ${textClassName}`}>
                  <OptionItem>
                    {isDarkTheme ? <AiFillHome /> : <AiOutlineHome />} Home
                  </OptionItem>
                </Link>

                <Link to="/trending" className={`link-item ${textClassName}`}>
                  <OptionItem>
                    {isDarkTheme ? <HiFire /> : <HiOutlineFire />} Trending
                  </OptionItem>
                </Link>

                <Link to="/gaming" className={`link-item ${textClassName}`}>
                  <OptionItem>
                    <SiYoutubegaming /> Gaming
                  </OptionItem>
                </Link>

                <Link
                  to="/saved-videos"
                  className={`link-item ${textClassName}`}
                >
                  <OptionItem>
                    <BiListPlus /> Saved Videos
                  </OptionItem>
                </Link>
              </OptionsContainer>
              <ContactUsContainer>
                <ContactUsHeading darkMode={isDarkTheme}>
                  CONTACT US
                </ContactUsHeading>
                <SocialMediaContainer>
                  <SocialMediaIcon
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="icon"
                  />
                  <SocialMediaIcon
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="icon"
                  />
                  <SocialMediaIcon
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="icon"
                  />
                </SocialMediaContainer>
                <ContactUsDescription darkMode={isDarkTheme}>
                  Enjoy! Now to see your channels and recommendations!
                </ContactUsDescription>
              </ContactUsContainer>
            </SideBarContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Sidebar
