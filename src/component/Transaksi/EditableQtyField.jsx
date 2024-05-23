import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function EditableQtyField({
  qty,
  barangId,
  startEdit,
  dataBarang,
  setSelectedBarang,
}) {
  const [editing, setEditing] = useState(false);
  const [editedQty, setEditedQty] = useState(qty);

  console.log(dataBarang);

  const updateQty = (newQty) => {
    if (dataBarang.diskon_pct === null) {
      const newData = dataBarang.map((item) =>
        item.id === barangId ? { ...item, qty: newQty } : item
      );
      setSelectedBarang(newData);
    }
    if (dataBarang.diskon_pct !== null) {
      const newData = dataBarang.map((item) =>
        item.id === barangId
          ? {
              ...item,
              qty: newQty,
              diskon_nilai: (item.diskon_pct / 100) * item.harga,
              harga_diskon: item.harga - (item.diskon_pct / 100) * item.harga,
              total: (item.harga - (item.diskon_pct / 100) * item.harga) * newQty,
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
    setEditedQty(qty);
  };
  return (
    <>
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateQty(editedQty);
          }}
          className="relative border p-4 rounded-lg"
        >
          <input
            className="pe-6 outline-none w-full"
            type="text"
            value={editedQty}
            onChange={(e) => setEditedQty(e.target.value)}
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
            {qty === null ? "-" : qty}
          </button>
        </div>
      )}
    </>
  );
}
