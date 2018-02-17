import {Component} from 'react'
import '/styles/base.scss'
import css from './Wrapper.scss'
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
      return <div className={css.main}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="theme-color" content="#1eaedb"/>
          <link rel="preload" type="text/css" href="/_next/static/style.css" as="style" />
  
          <link rel="icon" type="image/png" href="/static/favicon.png"/>
          <link rel="stylesheet" href="/_next/static/style.css"/>
  
          <meta property="og:site_name" content="yoursite.com" />
        </Head>
        <Header/>
        <div className={css.container}>
          <Child {...this.props}/>
        </div>
      </div>
    }
  }
  return Wrapper
}

export default withWrapper
