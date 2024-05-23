import React, { useEffect, useState } from "react";
import { deleteCustomerFn } from "../../api/customer";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export default function CustomerTable({ dataCustomer, refetch}) {
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);

  const handleDeleteCustomer = useMutation({
    mutationFn: (data) => deleteCustomerFn(data),

    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleConfirmDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await handleDeleteCustomer.mutateAsync(customerIdToDelete);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }

      if (result.isDismissed || result.isDenied) {
        setCustomerIdToDelete(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete batch", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    if (customerIdToDelete !== null) {
      handleConfirmDelete();
    }
  }, [customerIdToDelete]);

  return (
    <div>
      <div className="overflow-x-auto bg-white rounded-lg mt-10">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th className="text-sm text-black">No</th>
              <th className="text-sm text-black">Kode</th>
              <th className="text-sm text-black">Nama</th>
              <th className="text-sm text-black">Nomor Telepon</th>
              <th className="text-sm text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataCustomer?.map((customer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{customer.kode}</td>
                <td>{customer.name}</td>
                <td>{customer.telp}</td>
                <td>
                  {" "}
                  <button
                    className="btn bg-red-900 rounded-full"
                    onClick={() => {
                      setCustomerIdToDelete(customer.id);
                    }}
                  >
                    <MdDelete color="white" size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
