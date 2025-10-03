import LandingPage from "./pages/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <div>Error loading the app</div>,
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
