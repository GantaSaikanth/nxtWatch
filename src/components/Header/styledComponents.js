import styled from 'styled-components'

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  padding: 15px;
  background-color: ${props => (props.darkMode ? '#181818' : '#ffffff')};
  color: ${props => (!props.darkMode ? '#181818' : '#ffffff')};
  position: fixed;
  width: 100%;
  @media screen and (max-width: 576px) {
    display: none;
  }
`
export const Image = styled.img`
  height: 50px;
  width: 200px;
`
export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
`
export const Button = styled.button`
  background-color: transparent;
  outline: none;
  cursor: pointer;
  border: none;
`
export const Images = styled.img`
  height: 40px;
  width: 40px;
  margin: 10px;
`

export const NavDesktopContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  padding: 15px;
  background-color: ${props => (props.darkMode ? '#181818' : '#ffffff')};
  color: ${props => (!props.darkMode ? '#181818' : '#ffffff')};
  position: fixed;
  width: 100%;
  @media screen and (max-width: 576px) {
    display: none;
  }
`
export const NavBarDesktopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 98%;
`

export const WebsiteLogo = styled.img`
  width: 40%;
`
export const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 15%;
  height: 50px;
`

export const ThemeButton = styled.button`
  background-color: transparent;
  border: 0px;
  cursor: pointer;
`

export const Profile = styled.img`
  width: 10%;
  margin-right: 30px;
`

export const ThemeLogo = styled.img`
  width: 30%;
`
