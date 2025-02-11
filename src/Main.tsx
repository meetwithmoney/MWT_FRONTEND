import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import "./index.css";
import SocketContainer from "./socket/socket";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <SocketContainer>
      <App />
    </SocketContainer>
  </Provider>
  // </React.StrictMode>,
)
