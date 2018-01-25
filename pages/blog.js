import {Fragment, Component} from 'react'
import withWrapper from 'components/Wrapper'
import propTypes from 'prop-types'

@withWrapper
export default class extends Component {
  static getInitialProps ({ query: { id } }) {
    return { id }
  }
  
  static propTypes = {
    id: propTypes.oneOfType([propTypes.string, propTypes.number])
  }
  
  static defaultProps = {
    id: 'No id'
  }

  render () {
    return <Fragment>
      <h1>My {this.props.id} blog post</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Fragment>
  }
}
