import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'

import {
  ListItem,
  VideoImage,
  DetailsContainer,
  ProfileContainer,
  Profile,
  AboutContainer,
  Title,
  ChannelNameViewCountAndPublishedStyling,
  DynamicDataContainer,
} from './styledComponents'
import './index.css'

const VideoItem = props => {
  const {eachData} = props
  const {
    id,
    title,
    thumbnailUrl,
    name,
    profileImageUrl,
    viewCount,
    publishedAt,
  } = eachData

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <Link to={`/videos/${id}`} className="video-link-item">
            <ListItem>
              <VideoImage src={thumbnailUrl} alt="video thumbnail" />
              <DetailsContainer>
                <ProfileContainer>
                  <Profile src={profileImageUrl} alt="channel logo" />
                </ProfileContainer>
                <AboutContainer>
                  <Title darkMode={isDarkTheme}>{title}</Title>
                  <ChannelNameViewCountAndPublishedStyling>
                    {name}
                  </ChannelNameViewCountAndPublishedStyling>
                  <DynamicDataContainer>
                    <ChannelNameViewCountAndPublishedStyling>
                      {viewCount}
                    </ChannelNameViewCountAndPublishedStyling>
                    <ChannelNameViewCountAndPublishedStyling>
                      {publishedAt}
                    </ChannelNameViewCountAndPublishedStyling>
                  </DynamicDataContainer>
                </AboutContainer>
              </DetailsContainer>
            </ListItem>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default VideoItem
