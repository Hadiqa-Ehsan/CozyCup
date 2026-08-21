"use client";

export function LocationSelector() {
  return (
    <section className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-sm font-medium text-gray-700">Please select your location</h2>
      <div className="flex flex-wrap gap-3">
        <button className="rounded-md bg-[#C8102E] px-4 py-2 text-sm font-medium text-white hover:bg-red-800 transition">
          Use Current Location
        </button>
        <select className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-[#C8102E] focus:outline-none">
          <option>Select City / Region</option>
          <option>Lahore</option>
          <option>Karachi</option>
          <option>Islamabad</option>
          <option>Rawalpindi</option>
        </select>
      </div>
    </section>
  );
}