import React, { useEffect, useState } from "react";

export const UserCodeModal = ({
  dataCustomerById,
  dataCustomer,
  id,
  setCustomerId,
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState([]);

  const handleCheckboxChange = (id) => {
    setCustomerId(id);
    setSelectedCustomer((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((cid) => cid !== id);
      } else {
        return [id];
      }
    });
  };

  return (
    <dialog id="modal_customer" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="flex justify-between items-center ">
          <h3 className="font-bold text-lg">Customer List</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg mt-10">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="text-sm text-black">No</th>
                <th className="text-sm text-black">Kode</th>
                <th className="text-sm text-black">Nama</th>
                <th className="text-sm text-black">Nomor Telepon</th>
              </tr>
            </thead>
            <tbody>
              {dataCustomer?.length > 0 ? (
                dataCustomer.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(customer.id)}
                        checked={selectedCustomer.includes(customer.id)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{customer.kode}</td>
                    <td>{customer.name}</td>
                    <td>{customer.telp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td align="center" colSpan="5">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
};
