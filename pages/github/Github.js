import {Component} from 'react'
import propTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {reduxPage} from 'core/store'
import {getUser} from './Github.duck'
import css from './Github.scss'
import withWrapper from 'components/Wrapper'
import NProgress from 'nprogress'
import User from './User'

const mapStateToProps = (state) => (state.github)
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUser: (...args) => {
    const action = getUser(...args)
    NProgress.start()
    action.payload.promise.then(NProgress.done)
    return action
  }
}, dispatch)

@reduxPage
@withWrapper
@connect(mapStateToProps, mapDispatchToProps)
export class Github extends Component {
  static async getInitialProps({store, query: {user = 'JoJo'}}) {
    const action = getUser({user})
    store.dispatch(action)
    await action.payload.promise
  }
  
  static propTypes = {
    user: propTypes.object
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
