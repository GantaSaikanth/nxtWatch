import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Sidebar from '../Sidebar'

import {
  LoaderContainer,
  GamingContainer,
  GamingContentContainer,
  LinkItem,
  IconContainer,
  VideosContainer,
  Heading,
  Suggestion,
  RetryButtonInFailure,
  FailureImage,
  FailureContainer,
  ErrorMsg,
  ListItem,
  VideoImage,
  Title,
  ViewCount,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {gamingVid: [], apis: apiStatusConstants.initial}

  componentDidMount() {
    this.getGaming()
  }

  getGaming = async () => {
    this.setState({apis: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/videos/gaming'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachMovieDetails => ({
        id: eachMovieDetails.id,
        title: eachMovieDetails.title,
        thumbnailUrl: eachMovieDetails.thumbnail_url,
        viewCount: eachMovieDetails.view_count,
      }))

      this.setState({
        gamingVid: updatedData,
        apis: apiStatusConstants.success,
      })
    } else {
      this.setState({apis: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderContainer>
  )

  retryBtn = () => {
    this.getGaming()
  }

  successGaming = () => {
    const {gamingVid} = this.state

    return (
      <VideosContainer>
        {gamingVid.map(eachGaming => (
          <ThemeContext.Consumer key={eachGaming.id}>
            {value => {
              const {isDarkTheme} = value
              return (
                <Link
                  to={`/videos/${eachGaming.id}`}
                  className="video-link-item"
                >
                  <ListItem>
                    <VideoImage
                      src={eachGaming.thumbnailUrl}
                      alt="video thumbnail"
                    />
                    <Title darkMode={isDarkTheme}>{eachGaming.title}</Title>

                    <ViewCount>{`${eachGaming.viewCount} Watching Worldwide`}</ViewCount>
                  </ListItem>
                </Link>
              )
            }}
          </ThemeContext.Consumer>
        ))}
      </VideosContainer>
    )
  }

  renderFailurePage = () => {
    const onClickRetryButton = () => {
      this.retryBtn()
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const failureImg = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

          return (
            <FailureContainer>
              <FailureImage src={failureImg} alt="failure view" />
              <ErrorMsg darkMode={isDarkTheme}>
                Oops! Something Went Wrong
              </ErrorMsg>
              <Suggestion darkMode={isDarkTheme}>
                We are having some trouble to complete your request. Please try
                again.
              </Suggestion>
              <RetryButtonInFailure type="button" onClick={onClickRetryButton}>
                Retry
              </RetryButtonInFailure>
            </FailureContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderGaming = () => {
    const {apis} = this.state

    switch (apis) {
      case apiStatusConstants.success:
        return this.successGaming()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailurePage()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <>
              <Header />
              <GamingContainer darkMode={isDarkTheme} data-testid="gaming">
                <Sidebar />
                <GamingContentContainer>
                  <LinkItem darkMode={isDarkTheme}>
                    <IconContainer darkMode={isDarkTheme}>
                      <SiYoutubegaming className="header-icon" />
                    </IconContainer>
                    <Heading darkMode={isDarkTheme}>Gaming</Heading>
                  </LinkItem>
                  {this.renderGaming()}
                </GamingContentContainer>
              </GamingContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
