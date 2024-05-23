import React, { useState } from "react";
import { allBarangFn, getBarangByIdFn } from "../../api/barang";
import { useQuery } from "react-query";

export default function TambahBarangModal({
  dataBarang,
  setSelectedBarang,
  selectedBarang,
}) {
  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedBarang([...selectedBarang, id]);
    } else {
      setSelectedBarang(selectedBarang.filter((itemId) => itemId !== id));
    }
  };

  return (
    <div>
      <dialog id="tambah_barang_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Pilih Barang!</h3>
          <div className="overflow-x-auto bg-white rounded-lg mt-10">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th className="text-sm text-black">
                    <input
                      type="checkbox"
                      checked={selectedBarang?.length === dataBarang?.length}
                      onChange={() => {
                        if (selectedBarang?.length === dataBarang?.length) {
                          setSelectedBarang([]);
                        } else {
                          setSelectedBarang(
                            dataBarang.map((barang) => barang.id)
                          );
                        }
                      }}
                    />
                  </th>
                  <th className="text-sm text-black">No</th>
                  <th className="text-sm text-black">Kode</th>
                  <th className="text-sm text-black">Nama</th>
                  <th className="text-sm text-black">Harga</th>
                </tr>
              </thead>
              <tbody>
                {dataBarang?.map((barang, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBarang.includes(barang.id)}
                        onChange={(event) =>
                          handleCheckboxChange(event, barang.id)
                        }
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{barang?.kode}</td>
                    <td>{barang?.nama}</td>
                    <td>{barang?.harga}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  );
}
