import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo_1 from "../assets/logo_1.png"

export default function Sidebar({ children }) {
  const location = useLocation();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content !h-dvh bg-[#f0f4f8] flex flex-col overflow-y-auto">
        {children}
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content space-y-2">
          <div className="flex flex-col items-center justify-center w-36 h-36 rounded-full ml-10 ">
            <img className="object-cover  w-full h-full object-center rounded-full" src={logo_1}/>
          </div>
          <Link to="/">
            <li>
              <div
                className={`flex items-center gap-x-3.5 py-2 px-2.5  hover:text-white ${
                  location.pathname === "/"
                    ? "bg-cyan-900 text-white hover:bg-cyan-900"
                    : "bg-transparent text-gray-700 hover:bg-cyan-900"
                }`}
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Dashboard
              </div>
            </li>
          </Link>
          <Link to="/daftar-barang">
            <li className="hs-accordion" id="users-accordion">
              <div
                className={`flex items-center gap-x-3.5 py-2 px-2.5  hover:text-white ${
                  location.pathname === "/daftar-barang"
                    ? "bg-cyan-900 text-white hover:bg-cyan-900"
                    : "bg-transparent text-gray-700 hover:bg-cyan-900"
                }`}
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Daftar Barang
                <svg
                  className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </div>
            </li>
          </Link>
          <Link to="/daftar-customer">
            <li>
              <div
                className={`flex items-center gap-x-3.5 py-2 px-2.5  hover:text-white ${
                  location.pathname === "/daftar-customer"
                    ? "bg-cyan-900 text-white hover:bg-cyan-900"
                    : "bg-transparent text-gray-700 hover:bg-cyan-900"
                }`}
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
                Daftar Customer
              </div>
            </li>
          </Link>
          <Link to="/daftar-transaksi">
            <li>
              <div
                className={`flex items-center gap-x-3.5 py-2 px-2.5  hover:text-white ${
                  location.pathname === "/daftar-transaksi"
                    ? "bg-cyan-900 text-white hover:bg-cyan-900"
                    : "bg-transparent text-gray-700 hover:bg-cyan-900"
                }`}
              >
                <svg
                  className="size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                Daftar Transaksi
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
