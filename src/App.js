import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeContext from './context/ThemeContext'
import NotFound from './components/NotFound'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import './App.css'

// Replace your code here
class App extends Component {
  state = {isDarkTheme: false, savedVideosList: []}

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  saveVideoButtonClicked = data => {
    const {savedVideosList} = this.state
    this.setState({savedVideosList: [...savedVideosList, data]})
  }

  render() {
    const {isDarkTheme, savedVideosList} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          savedVideosList,
          saveVideoButtonClicked: this.saveVideoButtonClicked,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={LoginRoute} />
            <ProtectedRoute exact path="/" component={HomeRoute} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </>
      </ThemeContext.Provider>
    )
  }
}

export default App
