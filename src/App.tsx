import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router";
import Loading from "./components/Loading";
import useLogin from "./hooks/useLogin";

function App() {
  const { logLoading } = useLogin();

  return (
    <>
      {logLoading && <Loading />}

      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
