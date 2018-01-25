import React from 'react'
import Link from 'next/link'
import Styles from './Header.scss'

export default () => (
  <div className={Styles.wrapper}>
    <Styles/>
    <div className={Styles.header}>
      <div className={Styles.logo}>
        Aa front boilerplate
      </div>
      <nav className={Styles.nav}>
        <Link href="/" as="/"><a className={Styles.link}>Index page</a></Link>
        <Link href="/blog?id=1" as="/blog/1"><a className={Styles.link}>Post #1</a></Link>
        <Link href="/blog?id=2" as="/blog/2"><a className={Styles.link}>Post #2</a></Link>
        <Link href="/timeout?ms=3000" as="/timeout/3000"><a className={Styles.link}>Timeout page</a></Link>
        <Link href="/github?user=jerrycauser" as="/github/jerrycauser">
          <a className={Styles.link}>Github JerryCauser</a>
        </Link>
      </nav>
    </div>
  </div>
)
