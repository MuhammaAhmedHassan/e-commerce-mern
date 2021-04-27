import { createBrowserHistory } from "history";

const history = createBrowserHistory();

history.listen((location, action) => {
  if (action === "POP") {
    history.replace(location.pathname + location.search, { reset: false });
  }
});

export default history;
