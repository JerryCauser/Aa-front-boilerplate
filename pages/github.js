import {PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {reduxPage} from 'core/store'
import {getUser} from 'components/Github/Github.duck'
import withWrapper from 'components/Wrapper'
import NProgress from 'nprogress'
import Github from 'components/Github'

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
export default class GithubContainer extends PureComponent {
  static async getInitialProps({store, query: { user }}) {
    const action = getUser({user})
    store.dispatch(action)
    await action.payload.promise
  }
  render() {
    return <Github {...this.props}/>
  }
}
