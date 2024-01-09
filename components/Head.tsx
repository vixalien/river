// deno-fmt-ignore-file
// Keep the file data nicely aligned

import { absoluteUrl, env } from "../util/env.ts";

export function Head() {
  const imagePath = absoluteUrl("hello")

  return <>
  	<meta charset="utf-8"/>
		<meta name="google" content="notranslate" />
		<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
		{env.ALLOW_INDEXING == "0" && <meta name="robots" content="noindex" />}
		<title data-title={env.TITLE}>{env.TITLE}</title>
		<link rel="alternate" type="application/rss+xml" title="RSS Feed" href={absoluteUrl("feed.xml")}/>
		<meta property="og:title" content={env.TITLE}/>
		<meta property="og:type" content="website"/>
		<meta property="og:url" content={env.URL}/>
		<meta property="og:image" content={imagePath}/>
		<meta property="og:site_name" content={env.TITLE}/>
		<meta property="og:description" content={env.DESCRIPTION}/>
		<meta name="thumbnail" content={imagePath}/>
		<meta name="twitter:card" content="summary_large_image"/>
		<meta name="twitter:site" content={env.TWITTER_USERNAME}/>
		<meta name="twitter:title" content={env.TITLE}/>
		<meta name="twitter:description" content={env.DESCRIPTION}/>
		<meta name="twitter:image:src" content={imagePath}/>
		<meta name="description" content={env.DESCRIPTION}/>
		<link rel="stylesheet" type="text/css" media="screen" href="/css/master.css" />
		{env.ALLOW_IMAGE_SHARING && <link rel="stylesheet" type="text/css" href="/css/toastify.min.css"/>}
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1"/>
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1"/>
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1"/>
		<link rel="manifest" href="/site.webmanifest?v=1"/>
		<link rel="mask-icon" href="/favicon.svg?v=1"/>
		<link rel="shortcut icon" href="/favicon.ico?v=1"/>
		<meta name="msapplication-TileColor" content="#603cba"/>
		<meta name="theme-color" content="#ffffff"/>
  </>
}
