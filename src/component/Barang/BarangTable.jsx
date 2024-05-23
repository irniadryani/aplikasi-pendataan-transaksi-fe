import React, { useEffect, useState } from "react";
import { allBarangFn, deleteBarangFn } from "../../api/barang";
import { useMutation, useQuery } from "react-query";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function BarangTable({ dataBarang, refetch }) {
  const [barangIdToDelete, setBarangIdToDelete] = useState(null);

  const handleDeleteBarang = useMutation({
    mutationFn: (data) => deleteBarangFn(data),

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
        await handleDeleteBarang.mutateAsync(barangIdToDelete);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }

      if (result.isDismissed || result.isDenied) {
        setBarangIdToDelete(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete batch", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    if (barangIdToDelete !== null) {
      handleConfirmDelete();
    }
  }, [barangIdToDelete]);

  return (
    <div>
      <div className="overflow-x-auto bg-white rounded-lg mt-10">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th className="text-sm text-black">No</th>
              <th className="text-sm text-black">Kode</th>
              <th className="text-sm text-black">Nama</th>
              <th className="text-sm text-black">Harga</th>
              <th className="text-sm text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataBarang?.map((barang, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{barang.kode}</td>
                <td>{barang.nama}</td>
                <td>{barang.harga}</td>
                <td>
                  <button
                    className="btn bg-red-900 rounded-full"
                    onClick={() => {
                      setBarangIdToDelete(barang.id);
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
