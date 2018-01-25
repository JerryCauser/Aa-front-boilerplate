import {Component, Fragment} from 'react'
import Styles from './Wrapper.scss';
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import Header from '/components/Header'

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export function withWrapper(Child) {
  class Wrapper extends Component {
    static async getInitialProps(...args){
      if (typeof Child.getInitialProps !== 'function') {
        return {}
      }
      let initialProps = Child.getInitialProps(...args)
      if (initialProps instanceof Promise) {
        initialProps = await initialProps
      }
      return initialProps
    }
    
    render() {
      return <div className={Styles.main}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <link rel="stylesheet" type="text/css" href="/static/base.css"/>
          <link rel="icon" type="image/png" href="/static/favicon.png"/>
        </Head>
        <Styles/>
        <Header/>
        <div className={Styles.container}>
          <Child {...this.props}/>
        </div>
      </div>
    }
  }
  return Wrapper
}

export default withWrapper
