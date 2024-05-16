import { useQuery } from "react-query";
import { allPokemonFn, pokemonByIdFn, pokemonTypesFn } from "../api/Pokemon";
import { useEffect, useRef, useState } from "react";

export const Filter = ({ setFilter }) => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const { data: dataType, isLoading: isLoadingType } = useQuery(
    "allType",
    pokemonTypesFn
  );

  const clearSearch = () => {
    setSearch("");
    setShow(false);
    setFilter(null);
  };

  const node = useRef();

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setShow(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (typeName) => {
    setShow(false);
    setSearch(typeName);
  };
  return (
    <div className="relative inline-block text-left" ref={node}>
      <div className="flex justify-between gap-2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Type"
            className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 outline-none"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onClick={() => setShow(true)}
          />
          {search && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none hover:text-gray-700"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {show && (
        <div className="origin-top-right absolute left-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-32 overflow-y-auto cursor-pointer">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {dataType?.results
              .filter((type) =>
                type.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((type, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setFilter(type.name);
                    handleSelect(type.name)
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {type.name}
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
