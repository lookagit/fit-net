/* eslint-disable react/no-danger, no-return-assign, no-param-reassign */

// Component to render the full HTML response in React

// ----------------------
// IMPORTS
import React from 'react';


// ----------------------

const Html = ({ helmet, scripts, window, css, children }) => (
  <html lang="en" prefix="og: http://ogp.me/ns#" {...helmet.htmlAttributes.toString()}>
    <head>
      {helmet.title.toComponent()}
      <meta charSet="utf-8" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://fit-net.rs" />
      <meta property="og:title" content="Sport kakav zaista jeste!" />
      <meta property="og:image" content="https://s3.eu-central-1.amazonaws.com/zaluku/logo2.png" />
      <meta
        property="og:description"
        content="Fit-Net Sport kakav zaista jeste. Dobrodosli!" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {helmet.meta.toComponent()}
      {helmet.base.toString() ? helmet.base.toComponent() : <base href="/" />}
      <link rel="stylesheet" href={css} />
      {helmet.link.toComponent()}
      {helmet.style.toComponent()}
      {helmet.script.toComponent()}
      {helmet.noscript.toComponent()}
    </head>
    <body {...helmet.bodyAttributes.toComponent()}>
      <div id="main">{children}</div>
      <script
        dangerouslySetInnerHTML={{
          __html: Object.keys(window).reduce(
            (out, key) => out += `window.${key}=${JSON.stringify(window[key])};`,
            '',
          ),
        }} />
      {scripts.map(src => <script key={src} src={src} />)}
    </body>
  </html>
);

export default Html;
