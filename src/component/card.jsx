import { useState } from "react";
import { usePokemon } from "../pages/context";
import { Link } from "react-router-dom";

export const Card = ({
  id,
  name,
  image,
  type,
  weight,
  height,
  aliasName,
  removeButton,
}) => {
  const { addPokemon } = usePokemon();

  const [alias, setAlias] = useState("");

  const handleSave = () => {
    addPokemon({ id, name, alias, image, type, weight, height });
    document.getElementById(`modal_${id}`).close();
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl m-auto">
      <figure>
        <img src={image} alt="Shoes" className="w-full h-44 bg-gray-200" />
      </figure>
      <div className="p-5">
        {aliasName !== undefined && (
          <h2 className="text-2xl font-bold text-black capitalize">
            {name} - {aliasName}
          </h2>
        )}
        {aliasName === undefined && (
          <h2 className="text-2xl font-bold text-black capitalize">{name}</h2>
        )}
        <p className="text-sm text-gray-500">{type}</p>
        <div className="mt-3">
          <p className="font-medium text-black">Pokemon Information</p>
          <p className="text-gray-500 text-sm">Weight : {weight}</p>
          <p className="text-gray-500 text-sm">Height : {height}</p>
        </div>
        <div className="card-actions justify-end">
          {removeButton && removeButton}
          {!removeButton && (
            <button
              onClick={() => document.getElementById(`modal_${id}`).showModal()}
              className="text-sm font-medium px-5 py-[6px] rounded-md text-white bg-purple-700 hover:bg-purple-900"
            >
              Save
            </button>
          )}
        </div>
      </div>

      <div>
        <dialog id={`modal_${id}`} className="modal px-7">
          <div className="modal-box max-w-sm">
            <div className="flex flex-col">
              <div className="flex justify-between items-center gap-5">
                <h3 className="font-bold text-lg">Input your pokemon name</h3>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                </form>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full rounded-lg my-5"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
              <Link to="/collection">
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-5 py-[6px] rounded-md text-white bg-purple-700 hover:bg-purple-900 w-24"
                  >
                    Save
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </dialog>
        <div></div>
      </div>
    </div>
  );
};
