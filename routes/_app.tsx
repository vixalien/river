import { type PageProps } from "$fresh/server.ts";
import { Head } from "../components/Head.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <Head />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
