"use client";

export default function AdminProducts() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#3D2E24]">Products</h1>
      <p className="text-sm text-[#3D2E24]/70">Manage your products here</p>

      <div className="mt-6 rounded-2xl border border-[#98AB81]/40 bg-white p-6 shadow-sm">
        <button className="rounded-xl bg-[#98AB81] px-4 py-2 text-sm font-bold text-[#3D2E24] hover:bg-[#A9C07A]">
          Add New Product
        </button>
        <p className="mt-4 text-sm text-[#3D2E24]/70">No products yet</p>
      </div>
    </div>
  );
}