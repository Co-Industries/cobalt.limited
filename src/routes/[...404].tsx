import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <main>
      <Title>404 Page Not Found</Title>
      <HttpStatusCode code={404} />
      <h1>Page Not Found</h1>
      <img style="filter: invert(1)" src="/images/404.png"/>
    </main>
  );
}
