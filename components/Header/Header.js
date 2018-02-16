import React from 'react'
import Link from 'next/link'
import css from './Header.scss'

export default () => (
  <div className={css.wrapper}>
    <div className={css.header}>
      <div className={css.logo}>
        Aa front boilerplate
      </div>
      <nav className={css.nav}>
        <Link href="/" as="/"><a className={css.link}>Index page</a></Link>
        <Link href="/blog?id=1" as="/blog/1"><a className={css.link}>Post #1</a></Link>
        <Link href="/blog?id=2" as="/blog/2"><a className={css.link}>Post #2</a></Link>
        <Link href="/timeout?ms=3000" as="/timeout/3000"><a className={css.link}>Timeout page</a></Link>
        <Link href="/github?user=jerrycauser" as="/github/jerrycauser">
          <a className={css.link}>Github JerryCauser</a>
        </Link>
      </nav>
    </div>
  </div>
)
