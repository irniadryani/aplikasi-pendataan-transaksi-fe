import React from "react";

export default function TransaksiTable({ dataTransaksi }) {

  const grandTotal = dataTransaksi.reduce((sum, dataTransaksi) => {
    return sum + parseFloat(dataTransaksi.total_bayar);
  }, 0);

  return (
    <div>
      <div className="overflow-x-auto bg-white rounded-lg mt-10">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th className="text-sm text-black">No</th>
              <th className="text-sm text-black">Nomor Transaksi</th>
              <th className="text-sm text-black">Tanggal</th>
              <th className="text-sm text-black">Nama Customer</th>
              <th className="text-sm text-black">Jumlah Barang</th>
              <th className="text-sm text-black">Subtotal</th>
              <th className="text-sm text-black">Diskon</th>
              <th className="text-sm text-black">Ongkir</th>
              <th className="text-sm text-black">Total</th>
            </tr>
          </thead>
          <tbody>
            {dataTransaksi?.map((transaksi, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{transaksi.kode}</td>
                <td>{transaksi.tgl}</td>
                <td>{transaksi.nama}</td>
                <td>{transaksi.qty}</td>
                <td>{transaksi.subtotal}</td>
                <td>{transaksi.diskon}</td>
                <td>{transaksi.ongkir}</td>
                <td>{transaksi.total_bayar}</td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="8"
                className="text-sm text-black text-end font-semibold"
              >
                Grand Total
              </td>
              <td className="text-sm text-black">{grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
