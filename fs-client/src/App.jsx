import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './routes';
import './styles/App.css';

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

function App() {

  return <RouterProvider router={router} future={{
    v7_startTransition: true,
  }} />;
}

export default App;
