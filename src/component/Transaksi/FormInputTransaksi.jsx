import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  allDetailTransaksiFn,
  submitDetailTransaksiFn,
} from "../../api/detailTransaksi";
import InputTable from "./InputTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserCodeModal } from "./UserCodeModal";
import { allCustomerFn, getCustomerByIdFn } from "../../api/customer";
import { Link } from "react-router-dom";
import { allBarangFn } from "../../api/barang";

export default function FormInputTransaksi({
  refetchTransaksi,
  dataTransaksi,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [id, setCustomerId] = useState(null);
  const [kodeSales, setKodeSales] = useState(null);

  const {
    data: dataDetailTransaksi,
    refetch: refetchDetailTransaksi,
    isLoading: loadingDetailTransaksi,
    reset: resetDetailTransaksi,
  } = useQuery("detailTransaksi", allDetailTransaksiFn);

  const { data: dataCustomer } = useQuery("customer", allCustomerFn);

  const { data: dataBarang } = useQuery("barang", allBarangFn);

  const {
    data: dataCustomerById,
    refetch: refetchCustomerById,
    isLoading: loadingCustomerById,
  } = useQuery(["customerById", id], () => getCustomerByIdFn(id), {
    enabled: id !== null,
  });

  const {
    register,
    handleSubmit: submitTambahTransaksi,
    formState: { error },
    reset: resetTambahTransaksi,
    setValue: setValueTransaksi,
  } = useForm();

  const handleTransaksiResponse = useMutation({
    mutationFn: (data) => submitDetailTransaksiFn(data),
    onMutate() {},
    onSuccess: async (res) => {
      console.log(res);
      refetchTransaksi();
      resetTambahTransaksi();
      await Swal.fire({
        icon: "success",
        title: "Data transaksi Berhasil Dibuat!",
      });
      document.getElementById("tambah_transaksi").close();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const tambahTransaksi = (data) => {
    const dataTransaksi = new FormData();

    dataTransaksi.append("kode", data.kode);
    dataTransaksi.append("tgl", data.tgl);
    dataTransaksi.append("nama", data.nama);
    dataTransaksi.append("subtotal", data.subtotal);
    dataTransaksi.append("diskon", data.diskon);
    dataTransaksi.append("ongkir", data.ongkir);
    dataTransaksi.append("total_bayar", data.total_bayar);

    handleTransaksiResponse.mutateAsync(dataTransaksi);
  };

  useEffect(() => {
    if (id !== null) {
      refetchCustomerById();
    }
  }, [id]);

  useEffect(() => {
    if (dataCustomerById) {
      setValueTransaksi("kode", dataCustomerById.kode);
      setValueTransaksi("nama", dataCustomerById.name);
      setValueTransaksi("telp", dataCustomerById.telp);
    }
  }, [dataCustomerById]);

  console.log("kode", kodeSales);

  return (
    <div>
      <dialog id="tambah_transaksi" className="modal">
        <div className="modal-box max-w-full">
          <button
            onClick={() => {
              document.getElementById("tambah_transaksi").close();
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Transaksi</h3>

          <div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="">
                <label
                  htmlFor="kode"
                  className="flex font-semibold text-l mt-2"
                >
                  kode
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs rounded-lg mt-1"
                  onChange={(e) => setKodeSales(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="tanggal" className="flex font-semibold text-l">
                  Tanggal
                </label>
                <DatePicker
                  selected={startDate}
                  className="border border-grey p-2 my-2 rounded-lg items-center max-w-xs w-full"
                  onChange={(date) => setStartDate(date)}
                  {...register("tanggal", { required: true })}
                />
              </div>
              <h3 className="font-bold text-lg mt-3">Customer</h3>
              <div>
                <label
                  htmlFor="kode"
                  className="flex font-semibold text-l mt-1"
                >
                  Kode
                </label>
                <input
                  readOnly
                  placeholder="Select customer"
                  className="input input-bordered w-full max-w-xs rounded-lg mt-1 cursor-pointer focus:outline-none"
                  onClick={() => {
                    document.getElementById("modal_customer").showModal();
                  }}
                  {...register("kode", { required: true })}
                />
              </div>

              <div>
                <label
                  htmlFor="nama"
                  className="flex font-semibold text-l mt-1"
                >
                  Nama Customer
                </label>
                <input
                  type="text"
                  readOnly
                  placeholder="-"
                  className="input input-bordered w-full max-w-xs rounded-lg mt-1 cursor-not-allowed focus:outline-none"
                  {...register("nama", { required: true })}
                />
              </div>

              <div>
                <label
                  htmlFor="telp"
                  className="flex font-semibold text-l mt-1"
                >
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  readOnly
                  placeholder="-"
                  className="input input-bordered w-full max-w-xs rounded-lg mt-1 cursor-not-allowed focus:outline-none"
                  {...register("telp", { required: true })}
                />
              </div>

              <div className="mt-10">
                {!loadingDetailTransaksi &&
                  dataDetailTransaksi &&
                  dataBarang && (
                    <InputTable
                      kodeSales={kodeSales}
                      startDate={startDate}
                      dataCustomer={dataCustomerById}
                      dataBarang={dataBarang.data}
                      dataDetailTransaksi={dataDetailTransaksi.data}
                      refetch={refetchDetailTransaksi}
                      reset={resetDetailTransaksi}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </dialog>
      <UserCodeModal
        dataCustomer={dataCustomer?.data}
        dataCustomerById={dataCustomerById}
        id={id}
        setCustomerId={setCustomerId}
      />
    </div>
  );
}
