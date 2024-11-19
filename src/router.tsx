import { createBrowserRouter } from "react-router-dom";
import FormOrder from "@/pages/FormOrder";
import Orders from "@/pages/Orders";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FormOrder />
  },
  {
    path: '/orders',
    element: <Orders />
  },
])