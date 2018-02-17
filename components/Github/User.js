import {Fragment} from 'react'
import Head from 'next/head'
import css from './Github.scss'
import Meta from './Github.meta'

const User = ({user}) => {
  if (user.id === undefined) {
    return <Fragment>
      <h1 className={css.title}>There is no user with that name</h1>
    </Fragment>
  }
  
  let {
    subscriptions_url, id, type, gravatar_id, updated_at, starred_url, site_admin, repos_url, received_events_url,
    organizations_url, gists_url, following_url, followers_url, events_url, created_at, url, avatar_url,
    ...clearUser
  } = user;
  
  return <Fragment>
    <Head>
      <Meta {...user}/>
    </Head>
    <h1 className={css.title}>
      My name is {user.name || user.login}!
    </h1>
    <img src={user.avatar_url} className={css.avatar} alt={`${user.name}'s avatar`}/>
    <address className={css.pre}>
      {'{'}
        <table className={css.pretable}>
        <tbody>
        {Object.keys(clearUser).map((key, ix, list) => {
          return <tr key={key}>
            <td>
              <span className={css.hidden}>"</span>
              {key}
              <span className={css.hidden}>"</span>
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
      <span className={css.hidden}>{isLast ? '' : ','}</span>
    </td>
  }
  
  if (value !== '' && (_key === 'html_url' || _key === 'blog')) {
    if (!/^http/.test(value)) {
      value = `http://${value}`
    }
    value = <a href={value} target="_blank">{value}</a>
  }
  
  return <td>
    <span className={css.hidden}>"</span>
    {value}
    <span className={css.hidden}>"{isLast ? '' : ','}</span>
  </td>
}

export {User}
export default User
