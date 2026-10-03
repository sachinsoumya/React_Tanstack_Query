import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "./components/Layout/MainLayout";

import { FetchRQ } from "./components/Ui/FetchRQ";
import { Fetchold } from "./components/Ui/Fetchold";
import { Home } from "./components/Ui/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/fetch-old",
        element: <Fetchold />,
      },
      {
        path: "/react-query",
        element: <FetchRQ />,
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <MainLayout />
      </RouterProvider>
    </QueryClientProvider>

    // <div>
    //   <h1>React-Query</h1>
    // </div>
  );
}

export default App;
