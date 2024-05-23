import React from "react";
import Sidebar from "../component/Sidebar";
import CustomerTable from "../component/Customer/CustomerTable";
import { allCustomerFn, submitCustomerFn } from "../api/customer";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

export default function daftarCustomer() {
  const {
    data: dataCustomer,
    refetch: refetchCustomer,
    isLoading: loadingCustomer,
  } = useQuery("customer", allCustomerFn);

  console.log(dataCustomer);

  const {
    register,
    handleSubmit: submitTambahCustomer,
    formState: { error },
    reset: resetTambahCustomer,
  } = useForm();

  const handleCustomerResponse = useMutation({
    mutationFn: (data) => submitCustomerFn(data),

    onMutate() {},
    onSuccess: async (res) => {
      console.log(res);
      refetchCustomer();
      resetTambahCustomer();
      await Swal.fire({
        icon: "success",
        title: "Data Barang Berhasil Dibuat!",
      });
      document.getElementById("tambah_customer").close();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const tambahCustomer = (data) => {
    const dataCustomer = new FormData();
    console.log("data", dataCustomer);

    dataCustomer.append("kode", data.kode);
    dataCustomer.append("name", data.name);
    dataCustomer.append("telp", data.telp);

    handleCustomerResponse.mutateAsync(dataCustomer);
  };

  return (
    <div className="flex w-full relative">
      <div className="w-full">
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

        <div className="flex justify-end mt-5">
          <button
            className="btn bg-cyan-900 text-white shadow-2xl"
            onClick={() =>
              document.getElementById("tambah_customer").showModal()
            }
          >
            Tambah Customer
          </button>
        </div>
        {!loadingCustomer && dataCustomer && (
          <CustomerTable dataCustomer={dataCustomer.data} refetch={refetchCustomer}/>
        )}
      </div>

      <dialog id="tambah_customer" className="modal">
        <div className="modal-box max-w-96">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Tambah Customer</h3>

          <form onSubmit={submitTambahCustomer(tambahCustomer)}>
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
                  {...register("name", { required: true })}
                />
              </div>
              <div>
                <label
                  htmlFor="telp"
                  className="flex font-semibold text-l mt-1"
                >
                  telp
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs rounded-lg mt-1"
                  {...register("telp", { required: true })}
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
