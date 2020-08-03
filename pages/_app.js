import { ToastProvider } from "react-toast-notifications";
import "semantic-ui-css/semantic.min.css";

import "../styles/index.css";

export default function App({ Component, pageProps }) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}
