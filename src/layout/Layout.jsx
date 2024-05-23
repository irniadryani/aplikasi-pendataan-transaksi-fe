import React from "react";
import { Outlet } from "react-router-dom";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import Sidebar from "../component/Sidebar";

export const Layout = (props) => {
  const { content } = props;

  return (
    <main>
      <Sidebar>
        <div className="w-full">
          <div className="flex justify-between items-center z-40 sticky top-0 bg-white/80 backdrop-blur-xl">
            <div className="lg:hidden navbar navbar-transition bg-base">
              <div className="">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost drawer-button lg:hidden"
                >
                  <HiOutlineBars3CenterLeft size={24} />
                </label>
              </div>
            </div>
          </div>
          <div className="p-4 h-full">{content ?? <Outlet />}</div>
        </div>
      </Sidebar>
    </main>
  );
};
