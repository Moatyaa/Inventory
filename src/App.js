import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./Component/Layout/Layout"
import Login from "./Component/Login/Login"
import Home from "./Component/Home/Home"
import Users from "./Component/Users/Users.jsx"
import StoredItems from "./Component/StoredItems/StoredItems.jsx"
import { QueryClientProvider, QueryClient } from "react-query"
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute.jsx"
import DailyOperation from "./Component/DailyOperation/DailyOperation.jsx"

export default function App() {
  const queryClient = new QueryClient(); // Define queryClient instance

  let router = createBrowserRouter([{
    path: '', element: <Layout />, children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      {
        path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute>, children: [
          { path: 'users', element: <ProtectedRoute><Users /></ProtectedRoute> },
          { path: 'storedItems', element: <ProtectedRoute><StoredItems /></ProtectedRoute> },
          { path: 'dailyOperations', element: <ProtectedRoute><DailyOperation /></ProtectedRoute> },
          { index: 'true', element: <ProtectedRoute><DailyOperation /></ProtectedRoute> }
        ]
      }
    ]
  }])
  return <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
      </RouterProvider>

    </QueryClientProvider>
  </>
}