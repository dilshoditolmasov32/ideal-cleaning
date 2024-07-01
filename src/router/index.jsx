import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import ForgotPassword from '../components/forgot-password'
import Update from '../components/update'
import { SignUp, SignIn, Main, Dashboard, Order, Service } from "@pages";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="update" element={<Update />} />
        <Route path="main/*" element={<Main />} >
        <Route index element={<Dashboard />} />
        <Route path='service' element={<Service />} />
        <Route path="order" element={<Order />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
