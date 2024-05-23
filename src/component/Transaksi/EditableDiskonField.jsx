import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function EditableDiskonField({
  diskon,
  barangId,
  startEdit,
  dataBarang,
  setSelectedBarang,
  hargaBandrol,
  qty,
}) {
  const [editing, setEditing] = useState(false);
  const [editedDiskon, setEditedDiskon] = useState(diskon);

  const updateDiskon = (newDiskon) => {
    if (dataBarang.qty === null) {
      const newData = dataBarang.map((item) =>
        item.id === barangId
          ? {
              ...item,
              diskon_pct: newDiskon,
              diskon_nilai: (newDiskon / 100) * hargaBandrol,
              harga_diskon: hargaBandrol - (newDiskon / 100) * hargaBandrol,
              total: (item.harga - (newDiskon / 100) * item.harga) * item.qty,
            }
          : item
      );
      setSelectedBarang(newData);
    }
    if (dataBarang.qty !== null) {
      const newData = dataBarang.map((item) =>
        item.id === barangId
          ? {
              ...item,
              diskon_pct: newDiskon,
              diskon_nilai: (newDiskon / 100) * item.harga,
              harga_diskon: item.harga - (newDiskon / 100) * item.harga,
              total: (item.harga - (newDiskon / 100) * item.harga) * item.qty,
            }
          : item
      );
      setSelectedBarang(newData);
    }
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
    startEdit();
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedDiskon(diskon);
  };

  return (
    <div>
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateDiskon(editedDiskon);
          }}
          className="relative border p-4 rounded-lg"
        >
          <input
            className="pe-6 outline-none w-full"
            type="text"
            value={editedDiskon}
            onChange={(e) => setEditedDiskon(e.target.value)}
          />
          <button type="submit" hidden></button>
          <button type="button" onClick={handleCancel}>
            <FaTimes className="absolute right-4 top-1/2 -translate-y-1/2" />
          </button>
        </form>
      ) : (
        <div>
          <button
            className="flex justify-center font-semibold w-full"
            onClick={handleEdit}
          >
            {diskon === null ? "-" : diskon}%
          </button>
        </div>
      )}
    </div>
  );
}
