import {Component} from 'react'
import Cookies from 'js-cookie'

import {GrClose} from 'react-icons/gr'
import {BiSearchAlt2} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context/ThemeContext'
import VideoItem from '../VideoItem'
import {
  HomeContainer,
  HomeContentContainer,
  InputBox,
  VideosContainer,
  LoaderContainer,
  Button,
  BannerContainer,
  CloseButton,
  BannerLogo,
  BannerHeading,
  BannerButton,
  NoSearchResultsContainer,
  NoResultsMsg,
  Suggestion,
  RetryButtonInFailure,
  FailureImage,
  FailureContainer,
  ErrorMsg,
} from './styledComponents'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    showPopup: true,
    api: apiStatusConstants.initial,
    input: '',
    moviesList: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({api: apiStatusConstants.inProgress})

    const {input} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/all?search=${input}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.videos.map(eachData => ({
        id: eachData.id,
        title: eachData.title,
        thumbnailUrl: eachData.thumbnail_url,
        name: eachData.channel.name,
        profileImageUrl: eachData.channel.profile_image_url,
        viewCount: eachData.view_count,
        publishedAt: eachData.published_at,
      }))

      this.setState({moviesList: updatedData, api: apiStatusConstants.success})
    } else {
      this.setState({api: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderContainer>
  )

  closeBannerClicked = () => {
    this.setState({showPopup: false})
  }

  onChangeSearch = event => {
    this.setState({input: event.target.value})
  }

  onClickSearchBtn = () => {
    this.getVideos()
  }

  onClickRetry = () => {
    this.getVideos()
  }

  renderNoSearchResults = () => (
    <NoSearchResultsContainer>
      <FailureImage
        alt="no videos"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
      />
      <NoResultsMsg>No Search results found</NoResultsMsg>
      <Suggestion>Try different key words or remove search filter</Suggestion>
      <RetryButtonInFailure onClick={this.onClickRetry}>
        Retry
      </RetryButtonInFailure>
    </NoSearchResultsContainer>
  )

  renderSuccess = () => {
    const {moviesList} = this.state

    return (
      <VideosContainer>
        {moviesList.length === 0
          ? this.renderNoSearchResults()
          : moviesList.map(eachList => (
              <VideoItem key={eachList.id} eachData={eachList} />
            ))}
      </VideosContainer>
    )
  }

  retryBtn = () => {
    this.getVideos()
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

  renderVideos = () => {
    const {api} = this.state

    switch (api) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailurePage()
      default:
        return null
    }
  }

  render() {
    const {showPopup, input} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <>
              <Header />
              <HomeContainer darkMode={isDarkTheme} data-testid="home">
                <Sidebar />
                <HomeContentContainer>
                  {showPopup ? (
                    <BannerContainer data-testid="banner">
                      <CloseButton
                        type="button"
                        onClick={this.closeBannerClicked}
                        data-testid="close"
                      >
                        <GrClose />
                      </CloseButton>
                      <BannerLogo
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="nxt watch logo"
                      />
                      <BannerHeading>
                        Buy Nxt Watch Premium prepaid plans with UPI
                      </BannerHeading>
                      <BannerButton>GET IT NOW</BannerButton>
                    </BannerContainer>
                  ) : (
                    ''
                  )}

                  <InputBox
                    type="search"
                    placeholder="Search"
                    onChange={this.onChangeSearch}
                    value={input}
                  />
                  <Button
                    type="button"
                    data-testid="searchButton"
                    onClick={this.onClickSearchBtn}
                  >
                    <BiSearchAlt2 />
                  </Button>

                  {this.renderVideos()}
                </HomeContentContainer>
              </HomeContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
