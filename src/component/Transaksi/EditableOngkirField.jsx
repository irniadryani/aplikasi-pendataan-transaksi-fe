import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function EditableOngkirField({ ongkir, startEdit, setOngkir }) {
  const [editing, setEditing] = useState(false);
  const [editedOngkir, setEditedOngkir] = useState(ongkir);

  const updateOngkir = (newOngkir) => {
    setOngkir(newOngkir);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
    startEdit();
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedOngkir(ongkir);
  };

  return (
    <div>
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateOngkir(editedOngkir);
          }}
          className="relative border p-4 rounded-lg"
        >
          <input
            className="pe-6 outline-none w-full"
            type="text"
            value={editedOngkir}
            onChange={(e) => setEditedOngkir(e.target.value)}
          />
          <button type="submit" hidden></button>
          <button type="button" onClick={handleCancel}>
            <FaTimes className="absolute right-4 top-1/2 -translate-y-1/2" />
          </button>
        </form>
      ) : (
        <div>
          <button
            className="flex justify-end font-semibold w-full"
            onClick={handleEdit}
          >
            Rp. {ongkir === null ? "-" : ongkir}
          </button>
        </div>
      )}
    </div>
  );
}
