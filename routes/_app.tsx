import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html className="notranslate" translate="no">
      <head>
      </head>
      <body>
        <Component />
        <script src="/javascript.js"></script>
      </body>
    </html>
  );
}
