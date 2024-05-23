import React from "react";
import Sidebar from "../component/Sidebar";
import Table from "../component/Barang/BarangTable";
import { useMutation, useQuery } from "react-query";
import { allBarangFn, getBarangByIdFn, submitBarangFn } from "../api/barang";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function daftarBarang() {
  const {
    data: dataBarang,
    refetch: refetchBarang,
    isLoading: loadingBarang,
  } = useQuery("barang", allBarangFn);

  console.log(dataBarang);

  const {
    register,
    handleSubmit: submitTambahBarang,
    formState: { error },
    reset: resetTambahBarang,
  } = useForm();

  const handleBarangResponse = useMutation({
    mutationFn: (data) => submitBarangFn(data),

    onMutate() {},
    onSuccess: async (res) => {
      console.log(res);
      refetchBarang();
      resetTambahBarang();
      await Swal.fire({
        icon: "success",
        title: "Data Barang Berhasil Dibuat!",
      });
      document.getElementById("tambah_barang").close();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const tambahBarang = (data) => {
    const dataBarang = new FormData();
    console.log("data", dataBarang);

    dataBarang.append("kode", data.kode);
    dataBarang.append("nama", data.nama);
    dataBarang.append("harga", data.harga);

    handleBarangResponse.mutateAsync(dataBarang);
  };

  return (
    <div className="flex w-full relative">
      <div className="w-full">
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

        <div className="flex justify-end mt-3">
          <button
            className="btn bg-cyan-900 text-white shadow-2xl"
            onClick={() => document.getElementById("tambah_barang").showModal()}
          >
            Tambah Barang
          </button>
        </div>
        {!loadingBarang && dataBarang && <Table dataBarang={dataBarang.data} refetch={refetchBarang}/>}
      </div>

      <dialog id="tambah_barang" className="modal">
        <div className="modal-box max-w-96">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Tambah Barang</h3>

          <form onSubmit={submitTambahBarang(tambahBarang)}>
            <div className="flex flex-col gap-2">
              <div>
                <label
                  htmlFor="kode"
                  className="flex font-semibold text-l mt-3"
                >
                  Kode
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs rounded-lg mt-1"
                  {...register("kode", { required: true })}
                />
              </div>
              <div>
                <label
                  htmlFor="kode"
                  className="flex font-semibold text-l mt-1"
                >
                  Nama
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs rounded-lg mt-1"
                  {...register("nama", { required: true })}
                />
              </div>
              <div>
                <label
                  htmlFor="harga"
                  className="flex font-semibold text-l mt-1"
                >
                  Harga
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs rounded-lg mt-1"
                  {...register("harga", { required: true })}
                />
              </div>

              <div className="w-full flex justify-end">
                <button
                  className="btn btn-ghost btn-xl bg-cyan-950 text-white rounded-lg mt-2 mx-5"
                  type="submit"
                >
                  Tambah
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
