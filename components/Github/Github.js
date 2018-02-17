import {Component} from 'react'
import propTypes from 'prop-types'
import css from './Github.scss'
import User from './User'

export class Github extends Component {
  static propTypes = {
    user: propTypes.object,
    getUser: propTypes.func.isRequired
  }
  
  getUser = (e) => {
    e.preventDefault()
    const user = this.input.value
    this.props.getUser({user})
  }
  
  render() {
    return <article className={css.container}>
      <User user={this.props.user}/>
      <form onSubmit={this.getUser} className={css.form}>
        <input type="text" className={css.input} ref={ref => this.input = ref}/>
        <button className={css.button}>get</button>
      </form>
    </article>
  }
}

export default Github
