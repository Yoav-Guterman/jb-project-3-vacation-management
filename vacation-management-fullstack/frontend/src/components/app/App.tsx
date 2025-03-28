import { BrowserRouter } from "react-router-dom";
import Layout from "../layout/layout/Layout";
import './App.css'
import { Provider } from "react-redux";
import store from "../../redux/store";
import Auth from "../auth/auth/Auth";
import Io from "../io/Io";
import ToastProvider from "../common/toast/ToastProvider";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <ToastProvider />
      <BrowserRouter>
        <Provider store={store}>
          <Auth>
            <Io>
              <Layout />
            </Io>
          </Auth>
        </Provider>
      </BrowserRouter>
    </div>
  )
}