import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Dashboard from "../pages/index";
import DaftarBarang from "../pages/daftarBarang";
import DaftarCustomer from "../pages/daftarCustomer";
import DaftarTransaksi from "../pages/daftarTransaksi";
import { Layout } from "../layout/Layout";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path={"/daftar-barang"} element={<DaftarBarang />} />
        <Route path={"/daftar-customer"} element={<DaftarCustomer />} />
        <Route path={"/daftar-transaksi"} element={<DaftarTransaksi />} />
      </Route>
    </>
  )
);
export default Router;
