import { useRouteError } from "react-router-dom";

import BasePage from "./BasePage";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <BasePage>
      <h1> working on a process!</h1>

      <div>
        <i>{error.statusText || error.message}</i>{" "}
      </div>
    </BasePage>
  );
}
