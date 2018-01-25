import {Fragment} from 'react'
import Styles from './Github.scss'

const User = ({user}) => {
  if (user.id === undefined) {
    return <Fragment>
      <h1 className={Styles.title}>There is no user with that name</h1>
    </Fragment>
  }
  
  let {
    subscriptions_url, id, type, gravatar_id, updated_at, starred_url, site_admin, repos_url, received_events_url,
    organizations_url, gists_url, following_url, followers_url, events_url, created_at, url, avatar_url,
    ...clearUser
  } = user;
  
  return <Fragment>
    <h1 className={Styles.title}>
      My name is {user.name || user.login}!
    </h1>
    <img src={user.avatar_url} className={Styles.avatar} alt={`${user.name}'s avatar`}/>
    <address className={Styles.pre}>
      {'{'}
        <table className={Styles.pretable}>
        <tbody>
        {Object.keys(clearUser).map((key, ix, list) => {
          return <tr key={key}>
            <td>
              <span className={Styles.hidden}>"</span>
              {key}
              <span className={Styles.hidden}>"</span>
              :
            </td>
            <Value _key={key} value={clearUser[key]} isLast={ix+1 === list.length}/>
          </tr>
        })}
        </tbody>
        </table>
      {'}'}
    </address>
  </Fragment>
}

const Value = ({_key, value, isLast}) => {
  if (typeof value !== 'string') {
    return <td>
      {String(value)}
      <span className={Styles.hidden}>{isLast ? '' : ','}</span>
    </td>
  }
  
  if (value !== '' && (_key === 'html_url' || _key === 'blog')) {
    if (!/^http/.test(value)) {
      value = `http://${value}`
    }
    value = <a href={value} target="_blank">{value}</a>
  }
  
  return <td>
    <span className={Styles.hidden}>"</span>
    {value}
    <span className={Styles.hidden}>"{isLast ? '' : ','}</span>
  </td>
}

export {User}
export default User
