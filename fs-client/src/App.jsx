import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './routes';
import './styles/App.css';

import './config/firebaseConfig'


function App() {

  const router = createBrowserRouter(routes, {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true,
      v7_skipActionErrorRevalidation: true,
    }
  });

  return <RouterProvider router={router} future={{
    v7_startTransition: true,
  }} />;

}

export default App;
