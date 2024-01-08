import { type PageProps } from "$fresh/server.ts";
import { Head } from "../components/Head.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html className="notranslate" translate="no">
      <head>
        <Head />
      </head>
      <body>
        <Component />
        <script src="/javascript.js" ></script>
      </body>
    </html>
  );
}
