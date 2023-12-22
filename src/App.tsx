import { BrowserRouter as Router } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext";
import Routes from "./router";



function App() {

  return (
    <Router>
      <LoginProvider>
        <Routes />
      </LoginProvider>
    </Router>
  );
}

export default App;
