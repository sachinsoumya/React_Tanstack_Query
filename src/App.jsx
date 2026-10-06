import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "./components/Layout/MainLayout";

import { FetchRQ } from "./components/Ui/FetchRQ";
import { Fetchold } from "./components/Ui/Fetchold";
import { Home } from "./components/Ui/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { IndividualPost } from "./components/Ui/IndividualPost";

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
      {
        path:"/post/:id",
        element:<IndividualPost/>
      }
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

    // <div>
    //   <h1>React-Query</h1>
    // </div>
  );
}

export default App;
