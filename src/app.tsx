import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Background from "~/components/Background";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>Cobalt Industries Ltd.</Title>
          <Background />
          {/* <a href="/">Index</a> */}
          {/* <a href="/about">About</a>*/}
          {/*<Suspense>{props.children}</Suspense>*/}
          
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
