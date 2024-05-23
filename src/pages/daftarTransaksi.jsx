import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { allTransaksiFn, submitTransaksiFn } from "../api/transaksi";
import { useForm } from "react-hook-form";
import TransaksiTable from "../component/Transaksi/TransaksiTable";
import FormInputTransaksi from "../component/Transaksi/FormInputTransaksi";
import { IoMdSearch } from "react-icons/io";

export default function daftarTransaksi() {
  const [search, setSearch] = useState("");

  const {
    data: dataTransaksi,
    refetch: refetchTransaksi,
    isLoading: loadingTransaksi,
  } = useQuery("transaksi", allTransaksiFn);

  const filteredData = (data) => {
    return data.filter((transaksi) =>
      transaksi?.nama?.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="flex w-full relative">
      <div className="w-full">
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

        <div className="flex flex-row justify-between mt-10 items-center">
          <div className="flex items-center gap-2 pl-4 max-w-[200px] rounded-lg bg-white border border-[#06476F] hover:border-blue-500 focus:border-[#06476F]">
            <IoMdSearch fontSize="1.125 rem" color="#06476F" />
            <input
              type="text"
              className="flex h-10 pe-4 pb-1 w-full rounded-lg outline-none text-sm "
              placeholder="Search Customer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="btn bg-cyan-900 text-white shadow-2xl"
              onClick={() =>
                document.getElementById("tambah_transaksi").showModal()
              }
            >
              Tambah transaksi
            </button>
          </div>
        </div>
        {!loadingTransaksi && dataTransaksi && (
          <TransaksiTable dataTransaksi={filteredData(dataTransaksi.data)} />
        )}
      </div>

      <FormInputTransaksi refetch={refetchTransaksi} dataTransaksi={dataTransaksi} />
    </div>
  );
}
