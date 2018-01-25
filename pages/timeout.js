import { Component, Fragment } from 'react'
import propTypes from 'prop-types'
import withWrapper from 'components/Wrapper'

@withWrapper
export default class Timeout extends Component {
  // Add some delay
  static async getInitialProps ({ query: { ms = 3000} }) {
    ms = parseInt(ms)
    
    await new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
    return {ms}
  }
  
  static propTypes = {
    ms: propTypes.number.isRequired
  }

  render () {
    return (
      <Fragment>
        <p>This page will be load in {this.props.ms/1000} seconds!</p>
      </Fragment>
    )
  }
}
