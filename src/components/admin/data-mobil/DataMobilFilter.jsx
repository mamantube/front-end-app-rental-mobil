/* eslint-disable react/prop-types */
import { Search, Plus } from "lucide-react";

export default function DataMobilFilter(props) {
  const { q, onChangeValue, sort_by, onClickSearch, onCreateNew } = props;

  return (
    <div className=" border-b border-gray-200 bg-white shadow-sm mt-8 align">
      <div className="mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          {/* Search */}
          <div className="md:col-span-6">
            <input
              type="text"
              name="q"
              value={q}
              onChange={onChangeValue}
              placeholder="Cari Mobil..."
              autoComplete="off"
              className="
                h-10
                w-full
                rounded-lg
                border
                border-gray-300
                bg-gray-50
                px-4
                text-sm
                text-gray-800
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-gray-500
                focus:bg-white
                focus:ring-2
                focus:ring-gray-200
              "
            />
          </div>

          {/* Sort */}
          <div className="md:col-span-2">
            <select
              name="sort_by"
              value={sort_by}
              onChange={onChangeValue}
              className="
                h-10
                w-full
                rounded-lg
                border
                border-gray-300
                bg-gray-50
                px-3
                text-sm
                text-gray-700
                outline-none
                transition
                focus:border-gray-500
                focus:bg-white
                focus:ring-2
                focus:ring-gray-200
              "
            >
              <option value="">Urutkan Data</option>
              <option value="asc">Data Lama</option>
              <option value="desc">Data Baru</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={onClickSearch}
              className="
                flex
                h-10
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-100
                active:scale-[0.98]
              "
            >
              <Search size={17} />
              Cari Mobil
            </button>
          </div>

          {/* Create Button */}
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={onCreateNew}
              className="
                flex
                h-10
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-gray-800
                px-4
                text-sm
                font-medium
                text-white
                transition
                hover:bg-gray-700
                active:scale-[0.98]
              "
            >
              <Plus size={17} />
              Buat Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
