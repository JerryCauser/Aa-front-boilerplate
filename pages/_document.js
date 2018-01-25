import Document, {Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps({renderPage}) {
    const page = renderPage()
    return {...page}
  }
  
  render() {
    return (
      <html lang="en" dir="ltr">
        {/*don't insert <head></head> otherwise nextjs will render head tag 2 times*/}
        {/*and don't insert anything in Head tag, bcs nextjs will insert it in the end of head tag*/}
        <Head/>
        <body>
          <Main/>
          <NextScript />
        </body>
      </html>
    )
  }
}