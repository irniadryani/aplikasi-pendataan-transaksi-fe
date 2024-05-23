import React, { useState } from "react";
import { allBarangFn } from "../api/barang";
import { allCustomerFn } from "../api/customer";
import { allTransaksiFn } from "../api/transaksi";
import { useQuery } from "react-query";
import Chart from "../component/Chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function index() {
  const {
    data: dataBarang,
    refetch: refetchBarang,
    isLoading: loadingBarang,
  } = useQuery("barang", allBarangFn);

  const {
    data: dataCustomer,
    refetch: refetchCustomer,
    isLoading: loadingCustomer,
  } = useQuery("customer", allCustomerFn);

  const {
    data: dataTransaksi,
    refetch: refetchTransaksi,
    isLoading: loadingTransaksi,
  } = useQuery("transaksi", allTransaksiFn);

  const [value, setValue] = useState(new Date());

  const onChange = (nextValue) => {
    setValue(nextValue);
  };

  return (
    <div className="flex w-full relative">
      <div className="w-full">
        <div className="flex flex-row gap-5 m-10">
          <div className="p-4 bg-[#ffffff] shadow-xl rounded-lg h-40 flex flex-col justify-end max-w-44 max-h-36">
            {!loadingBarang && dataBarang?.data?.length !== undefined && (
              <h1 className="font-bold text-6xl text-center text-black flex justify-star mb-3">
                {dataBarang?.data?.length}
              </h1>
            )}
            <p className="text-xl font-medium text-black">
              {dataBarang?.data?.length > 1 ? "Total Barang" : "Total Barang"}
            </p>
          </div>

          <div className="p-4 bg-[#ffffff] shadow-xl rounded-lg h-40 flex flex-col justify-end max-w-44 max-h-36">
            {!loadingCustomer && dataCustomer?.data?.length !== undefined && (
              <h1 className="font-bold text-6xl text-center text-black flex justify-star mb-3">
                {dataCustomer?.data?.length}
              </h1>
            )}
            <p className="text-xl font-medium text-black">
              {dataCustomer?.data?.length > 1
                ? "Total Customer"
                : "Total Customer"}
            </p>
          </div>
          <div className="p-4 bg-[#ffffff] shadow-xl rounded-lg h-40 flex flex-col justify-end max-w-44 max-h-36">
            {!loadingTransaksi && dataTransaksi?.data?.length !== undefined && (
              <h1 className="font-bold text-6xl text-center text-black flex justify-star mb-3">
                {dataTransaksi?.data?.length}
              </h1>
            )}
            <p className="text-xl font-medium text-black">
              {dataTransaksi?.data?.length > 1
                ? "Total transaksi"
                : "Total transaksi"}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="flex mt-10 mb-10 border rounded-lg p-5 w-full mx-10">
            <div className="w-full">
              <h3 className="font-medium mb-8 text-black/60">
                Chart Transaksi
              </h3>
              <Chart
                dataTransaksi={dataTransaksi?.data}
                refetch={refetchBarang}
              />
            </div>
          </div>
          <div className="flex justify-end items-end w-full max-w-64">
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </div>
  );
}
