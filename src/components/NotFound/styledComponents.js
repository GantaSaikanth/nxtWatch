import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => (props.darkMode ? '#181818' : '#f9f9f9')};
  display: flex;
`
export const NotFoundContentContainer = styled.div`
  min-height: 100px;
  margin-top: 80px;
  width: 88%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const NotFoundImage = styled.img`
  width: 50%;
`

export const NotFoundText = styled.h1`
  color: ${props => (props.darkMode ? '#f9f9f9' : '#181818')};
  font-family: 'Roboto';
`

export const SorryMsg = styled.p`
  color: ${props => (props.darkMode ? '#f9f9f9' : '#181818')};
  font-family: 'Roboto';
`
