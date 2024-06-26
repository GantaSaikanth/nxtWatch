import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import {
  LoaderContainer,
  VideoDetailsContainer,
  VideoContentContainer,
  PlayerAndVideoDetailsContainer,
  ReactPlayerContainer,
  Description,
  DynamicDataContainer,
  DynamicDataStyling,
  LeftDynamicContainer,
  RightDynamicContainer,
  ProfileContainer,
  Profile,
  ChannelNameViewCountAndPublishedStyling,
  Title,
  Button,
  DetailsContainer,
  AboutContainer,
  HorizontalLine,
  Suggestion,
  RetryButtonInFailure,
  FailureImage,
  FailureContainer,
  ErrorMsg,
} from './styledComponents'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import './index.css'
import Sidebar from '../Sidebar'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiStatusConstants.initial,
    isLike: false,
    isDislike: false,
    isSaved: false,
  }

  componentDidMount() {
    this.fetchVideoData()
  }

  fetchVideoData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedVideoDetails = {
        id: data.video_details.id,
        title: data.video_details.title,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        viewCount: data.video_details.view_count,
        videoUrl: data.video_details.video_url,
        description: data.video_details.description,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      }

      this.setState({
        videoDetails: updatedVideoDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPlayer = () => {
    const {videoDetails} = this.state
    return (
      <ReactPlayerContainer>
        <ReactPlayer
          url={videoDetails.videoUrl}
          controls
          width="100%"
          height="70vh"
        />
      </ReactPlayerContainer>
    )
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderContainer>
  )

  renderVideoDetailsOnSuccess = () => {
    const {videoDetails, isLike, isDislike, isSaved} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, saveVideoButtonClicked} = value
          const likeIconClassName = isLike ? 'selected' : 'not-selected'
          const dislikeIconClassName = isDislike ? 'selected' : 'not-selected'
          const saveButtonIconClassName = isSaved ? 'selected' : 'not-selected'
          const saveButtonText = isSaved ? 'Saved' : 'Save'

          const onSaveButtonClicked = () => {
            this.setState(prevState => ({isSaved: !prevState.isSaved}))
            saveVideoButtonClicked({
              videoDetails,
            })
          }

          const onLikeButtonClicked = () => {
            this.setState({isLike: true, isDislike: false})
          }

          const onDislikeButtonClicked = () => {
            this.setState({isDislike: true, isLike: false})
          }

          return (
            <PlayerAndVideoDetailsContainer>
              {this.renderPlayer()}
              <Description darkMode={isDarkTheme}>
                {videoDetails.description}
              </Description>
              <DynamicDataContainer>
                <LeftDynamicContainer>
                  <DynamicDataStyling darkMode={isDarkTheme}>
                    {videoDetails.viewCount}
                  </DynamicDataStyling>
                  <DynamicDataStyling darkMode={isDarkTheme}>
                    {videoDetails.publishedAt}
                  </DynamicDataStyling>
                </LeftDynamicContainer>
                <RightDynamicContainer>
                  <Button active={isLike} onClick={onLikeButtonClicked}>
                    <AiOutlineLike
                      className={`icon-in-video-item ${likeIconClassName}`}
                    />
                    Like
                  </Button>

                  <Button active={isDislike} onClick={onDislikeButtonClicked}>
                    <AiOutlineDislike
                      className={`icon-in-video-item ${dislikeIconClassName}`}
                    />
                    Dislike
                  </Button>

                  <BiListPlus
                    className={`icon-in-video-item ${saveButtonIconClassName} `}
                  />
                  <Button
                    onClick={onSaveButtonClicked}
                    className={saveButtonIconClassName}
                  >
                    {saveButtonText}
                  </Button>
                </RightDynamicContainer>
              </DynamicDataContainer>
              <HorizontalLine />
              <DetailsContainer>
                <ProfileContainer>
                  <Profile
                    src={videoDetails.profileImageUrl}
                    alt="channel logo"
                  />
                </ProfileContainer>
                <AboutContainer>
                  <Title darkMode={isDarkTheme}>{videoDetails.title}</Title>
                  <ChannelNameViewCountAndPublishedStyling>
                    {videoDetails.name}
                  </ChannelNameViewCountAndPublishedStyling>
                  <DynamicDataContainer>
                    <ChannelNameViewCountAndPublishedStyling>
                      {videoDetails.subscriberCount}
                    </ChannelNameViewCountAndPublishedStyling>
                  </DynamicDataContainer>
                </AboutContainer>
              </DetailsContainer>
            </PlayerAndVideoDetailsContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  retryBtn = () => {
    this.fetchVideoData()
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

  render() {
    const {apiStatus} = this.state
    let renderBasedOnApiStatus

    switch (apiStatus) {
      case apiStatusConstants.failure:
        renderBasedOnApiStatus = this.renderFailurePage()
        break
      case apiStatusConstants.success:
        renderBasedOnApiStatus = this.renderVideoDetailsOnSuccess()
        break
      case apiStatusConstants.inProgress:
        renderBasedOnApiStatus = this.renderLoader()
        break
      default:
        renderBasedOnApiStatus = ''
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <>
              <Header />
              <VideoDetailsContainer
                darkMode={isDarkTheme}
                data-testid="videoItemDetails"
              >
                <Sidebar />
                <VideoContentContainer>
                  {renderBasedOnApiStatus}
                </VideoContentContainer>
              </VideoDetailsContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
