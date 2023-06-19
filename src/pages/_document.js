import Document, { Html, Main, Head, NextScript } from "next/document";
import Link from "next/link";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Link
            rel="preload"
            href="/public/fonts/Raleway-SemiBold.ttf"
            as="font"
            crossOrigin="anonymous"
          />
          <Link
            rel="preload"
            href="/public/fonts/Raleway-Regular.ttf"
            as="font"
            crossOrigin="anonymous"
          />
          <Link
            rel="preload"
            href="/public/fonts/Raleway-Bold.ttf"
            as="font"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
