import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiOutlineFire, HiFire} from 'react-icons/hi'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context/ThemeContext'
import VideoItem from '../VideoItem'

import {
  TrendingContainer,
  TrendingContentContainer,
  VideosContainer,
  LoaderContainer,
  LinkItem,
  IconContainer,
  Heading,
  Suggestion,
  RetryButtonInFailure,
  FailureImage,
  FailureContainer,
  ErrorMsg,
} from './styledComponents'

const apiStatusConstantsForTrend = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {trendVid: [], apiStatus: apiStatusConstantsForTrend.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstantsForTrend.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachMovieDetails => ({
        id: eachMovieDetails.id,
        title: eachMovieDetails.title,
        publishedAt: eachMovieDetails.published_at,
        thumbnailUrl: eachMovieDetails.thumbnail_url,
        viewCount: eachMovieDetails.view_count,
        name: eachMovieDetails.channel.name,
        profileImageUrl: eachMovieDetails.channel.profile_image_url,
      }))

      this.setState({
        trendVid: updatedData,
        apiStatus: apiStatusConstantsForTrend.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstantsForTrend.failure})
    }
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderContainer>
  )

  retryBtn = () => {
    this.getTrendingVideos()
  }

  renderFailureTrend = () => {
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

  successTrend = () => {
    const {trendVid} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <>
              <LinkItem darkMode={isDarkTheme}>
                <IconContainer darkMode={isDarkTheme}>
                  {isDarkTheme ? (
                    <HiFire className="header-icon" />
                  ) : (
                    <HiOutlineFire className="header-icon" />
                  )}
                </IconContainer>
                <Heading darkMode={isDarkTheme}>Trending</Heading>
              </LinkItem>
              <VideosContainer darkMode={isDarkTheme}>
                {trendVid.map(eachData => (
                  <VideoItem key={eachData.id} eachData={eachData} />
                ))}
              </VideosContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderPagesss = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstantsForTrend.success:
        return this.successTrend()
      case apiStatusConstantsForTrend.inProgress:
        return this.renderLoader()
      case apiStatusConstantsForTrend.failure:
        return this.renderFailureTrend()
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
              <TrendingContainer darkMode={isDarkTheme} data-testid="trending">
                <Sidebar />
                <TrendingContentContainer>
                  {this.renderPagesss()}
                </TrendingContentContainer>
              </TrendingContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
