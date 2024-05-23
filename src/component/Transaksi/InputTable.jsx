import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  detailTransaksiByIdFn,
  submitDetailTransaksiFn,
  updateDetailTransaksiFn,
  deleteDetailTransaksiFn,
} from "../../api/detailTransaksi";
import { FaTimes } from "react-icons/fa";
import { useMutation } from "react-query";
import TambahBarangModal from "../Barang/TambahBarangModal";
import EditableDiskonField from "./EditableDiskonField";
import EditableOngkirField from "./EditableOngkirField";
import { useForm } from "react-hook-form";
import { getBarangByIdFn } from "../../api/barang";
import EditableQtyField from "./EditableQtyField";
import swal from "sweetalert";

export default function InputTable({
  refetch,
  dataBarang,
  dataCustomer,
  kodeSales,
  startDate,
}) {
  const [barangId, setBarangId] = useState();
  const [ongkir, setOngkir] = useState(0);
  const [selectedBarangId, setSelectedBarangId] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState([]);

  const {
    register,
    handleSubmit: submitTambahTransaksi,
    formState: { errors },
    reset: resetTambahTransaksi,
  } = useForm();

  const handleTransaksiResponse = useMutation({
    mutationFn: (data) => submitDetailTransaksiFn(data),

    onMutate() {},
    onSuccess: async (res) => {
      console.log(res);
      refetch();
      resetTambahTransaksi();
      await swal.fire({
        icon: "success",
        title: "Data Transaksi Berhasil Dibuat!",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const tambahTransaksi = (data) => {
    const transaksiData = {
      kode: kodeSales,
      tgl: startDate,
      cust_id: dataCustomer.id,
      subtotal: selectedBarang.reduce((acc, barang) => acc + barang.harga, 0),
      ongkir: ongkir,
      total_bayar: selectedBarang.reduce(
        (acc, barang) => acc + barang.total,
        0
      ),
      diskon: selectedBarang.reduce(
        (acc, barang) => acc + barang.diskon_nilai,
        0
      ),
      barang: selectedBarang.map((item) => ({
        barang_id: item.barang_id,
        harga_bandrol: item.harga,
        qty: item.qty,
        diskon_pct: item.diskon_pct === null ? 0 : item.diskon_pct,
        diskon_nilai: item.diskon_nilai,
        harga_diskon: item.harga_diskon,
        total: item.total,
      })),
    };

    handleTransaksiResponse.mutateAsync(transaksiData);

    console.log(transaksiData);
  };

  useEffect(() => {
    const fetchBarang = async () => {
      const newSelectedBarang = [];
      for (const id of selectedBarangId) {
        if (!selectedBarang.some((barang) => barang.id === id)) {
          const barang = await getBarangByIdFn(id);
          const barangData = {
            id: selectedBarang.length + 1,
            barang_id: barang.id,
            kode_barang: barang.kode,
            nama_barang: barang.nama,
            harga: barang.harga,
            nama_customer: dataCustomer.name,
            kode_customer: dataCustomer.kode,
            telp: dataCustomer.telp,
            harga_bandrol: null,
            qty: null,
            diskon_pct: null,
            diskon_nilai: null,
            harga_diskon: null,
            total: null,
            ongkir: null,
          };
          newSelectedBarang.push(barangData);
        } else {
          newSelectedBarang.push(
            selectedBarang.find((barang) => barang.id === id)
          );
        }
      }
      setSelectedBarang(newSelectedBarang);
    };
    fetchBarang();
  }, [selectedBarangId]);

  let grandTotal = selectedBarang.reduce(
    (acc, barang) => acc + barang.total,
    0
  );

  const deleteBarang = (barangId) => {
    setSelectedBarang(
      selectedBarang.filter((item) => item.barang_id !== barangId)
    );
  };

  return (
    <div>
      <div className="overflow-x-auto bg-white rounded-lg">
        <table className="table border table-zebra">
          <thead>
            <tr className="text-center">
              <th
                className="text-sm text-black text-center align-middle border bg-transparent"
                rowSpan={2}
              >
                <button
                  className="btn bg-green-900 text-white"
                  onClick={() =>
                    document.getElementById("tambah_barang_modal").showModal()
                  }
                >
                  Tambah
                </button>
              </th>
              <th
                className="text-sm text-black align-bottom border"
                rowSpan={2}
              >
                No
              </th>
              <th
                className="text-sm text-black align-bottom border"
                rowSpan={2}
              >
                Kode Barang
              </th>
              <th
                className="text-sm text-black align-bottom border"
                rowSpan={2}
              >
                Nama Barang
              </th>
              <th
                className="text-sm text-right text-black align-bottom border"
                rowSpan={2}
              >
                Qty
              </th>
              <th
                className="text-sm text-right text-black align-bottom border"
                rowSpan={2}
              >
                Harga Bandrol
              </th>
              <th className="text-sm text-black border" colSpan={2}>
                Diskon
              </th>
              <th
                className="text-sm text-right text-black align-bottom border"
                rowSpan={2}
              >
                Harga Diskon
              </th>
              <th
                className="text-sm text-right text-black align-bottom border"
                rowSpan={2}
              >
                Total
              </th>
            </tr>
            <tr>
              <th className="text-sm text-black text-center border">%</th>
              <th className="text-sm text-right text-black border">(Rp)</th>
            </tr>
          </thead>
          <tbody>
            {selectedBarang?.length !== 0 &&
              selectedBarang?.map((dataDetailTransaksi, index) => {
                // const diskonRp =
                //   (dataDetailTransaksi.diskon_pct / 100) * hargaBandrol;
                // const hargaDiskon = hargaBandrol - diskonRp;
                // const total =
                //   parseFloat(hargaBandrol) +
                //   parseFloat(diskonRp) +
                //   parseFloat(dataDetailTransaksi.ongkir);

                return (
                  <tr key={index}>
                    <td className="border">
                      <div className="flex flex-row justify-center items-center gap-1 w-full">
                        <button
                          className="btn bg-yellow-600 text-white"
                          onClick={() =>
                            document
                              .getElementById("tambah_barang_modal")
                              .showModal()
                          }
                        >
                          Ubah
                        </button>
                        <button
                          className="btn bg-red-900 text-white"
                          onClick={() =>
                            deleteBarang(dataDetailTransaksi.barang_id)
                          }
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                    <td className="border">{index + 1}</td>
                    <td className="border">
                      {dataDetailTransaksi.kode_barang}
                    </td>
                    <td className="border">
                      {dataDetailTransaksi.nama_barang}
                    </td>
                    <td className="border">
                      <EditableQtyField
                        className="border rounded px-2 py-1 w-full h-full"
                        qty={dataDetailTransaksi.qty || 0}
                        startEdit={() => setBarangId(index + 1)}
                        startEditId={barangId}
                        barangId={index + 1}
                        refetch={refetch}
                        dataBarang={selectedBarang}
                        setSelectedBarang={setSelectedBarang}
                      />
                    </td>
                    <td className="border text-right">
                      Rp. {dataDetailTransaksi.harga}
                    </td>
                    <td className="border">
                      <EditableDiskonField
                        className="border rounded px-2 py-1 w-full h-full"
                        qty={dataDetailTransaksi.qty}
                        hargaBandrol={dataDetailTransaksi.harga}
                        diskon={dataDetailTransaksi.diskon_pct || 0}
                        startEdit={() => setBarangId(index + 1)}
                        startEditId={barangId}
                        barangId={index + 1}
                        refetch={refetch}
                        dataBarang={selectedBarang}
                        setSelectedBarang={setSelectedBarang}
                      />
                    </td>
                    <td className="border text-right">
                      Rp. {dataDetailTransaksi.diskon_nilai || 0}
                    </td>
                    <td className="border text-right">
                      Rp. {dataDetailTransaksi.harga_diskon || 0}
                    </td>
                    <td className="border text-right">
                      Rp. {dataDetailTransaksi.total || 0 || 0}
                    </td>
                  </tr>
                );
              })}
            {selectedBarang?.length !== 0 && (
              <>
                <tr>
                  <td
                    colSpan="9"
                    className="text-sm text-black text-end font-semibold"
                  >
                    Harga Ongkir
                  </td>
                  <td className="text-sm text-black text-right">
                    <EditableOngkirField
                      className="border rounded px-2 py-1 w-full h-full"
                      ongkir={ongkir || 0}
                      refetch={refetch}
                      dataBarang={selectedBarang}
                      setSelectedBarang={setSelectedBarang}
                      setOngkir={setOngkir}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="9"
                    className="text-sm text-black text-end font-semibold"
                  >
                    Total Bayar
                  </td>
                  <td className="text-sm text-black text-right">
                    Rp. {grandTotal + parseFloat(ongkir) || 0}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        <div className="w-full flex flex-row justify-center mt-10">
          <button
            onClick={() => tambahTransaksi()}
            className="btn btn-ghost btn-xl bg-cyan-950 text-white rounded-lg mt-2 mx-5"
            type="button"
          >
            Simpan
          </button>

          <div>
            <button
              type="button"
              onClick={() => {
                document.getElementById("tambah_transaksi").close();
              }}
              className="btn btn-ghost btn-xl bg-cyan-950 text-white rounded-lg mt-2 mx-5"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
      <TambahBarangModal
        dataBarang={dataBarang}
        selectedBarang={selectedBarangId}
        setSelectedBarang={setSelectedBarangId}
      />
    </div>
  );
}
