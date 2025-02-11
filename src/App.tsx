import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./hoc/ErrorBoundary";
import AppRoutes from "./routes/AppRoutes";
import ToastNotification from "./components/common/ToastNotification";
import { config } from "./config/config";

function App() {

  return (
    <>
      <BrowserRouter basename={config.baseName}>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes />
            <ToastNotification />
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  )
}

export default App;
