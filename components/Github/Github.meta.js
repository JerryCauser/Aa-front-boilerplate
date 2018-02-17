import {Fragment} from 'react'

export const Meta = ({
  login = '',
  html_url = '',
  name = '',
  company = '',
  blog = '',
  location = '',
  email = '',
  bio = '',
  avatar_url = ''
}) => (
  <Fragment>
    <meta property="og:title" content={`Developer: ${name} (${login})"`}/>
    <title>{`Developer: ${name} (${login})"`}</title>
    
    <meta name="keywords" content={`developer, ${[login, name, company, location].filter(Boolean).join(', ')}`}/>
    
    <meta property="og:description" content={bio}/>
    <meta name="description" content={bio}/>
    
    <meta property="og:image" content={avatar_url}/>
    <meta name="image_src" content={avatar_url}/>
    <meta name="image_url" content={avatar_url}/>
    
    <meta property="og:url" content={blog || html_url}/>
    <meta property="og:locale" content={`en_GB"`}/>
    <meta property="og:type" content={`profile`}/>
    <meta property="profile:username" content={name}/>
  </Fragment>
)

export default Meta