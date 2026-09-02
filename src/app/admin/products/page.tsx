"use client";

import { useState } from "react";
import { Coffee, Plus, Search, Trash2, Edit3, Check, X, Tag, DollarSign, Package } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Available" | "Out of Stock";
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Caramel Macchiato", category: "Espresso & Coffee", price: 580, stock: 45, status: "Available" },
    { id: 2, name: "Classic Croissant", category: "Bakery & Pastry", price: 420, stock: 20, status: "Available" },
    { id: 3, name: "Iced Vanilla Latte", category: "Cold Beverages", price: 650, stock: 30, status: "Available" },
    { id: 4, name: "Blueberry Muffin", category: "Bakery & Pastry", price: 380, stock: 0, status: "Out of Stock" },
    { id: 5, name: "Mocha Frappe", category: "Cold Beverages", price: 720, stock: 15, status: "Available" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Form state for adding new product
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Espresso & Coffee");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice || !newStock) return;

    const newItem: Product = {
      id: Date.now(),
      name: newName,
      category: newCategory,
      price: Number(newPrice),
      stock: Number(newStock),
      status: Number(newStock) > 0 ? "Available" : "Out of Stock",
    };

    setProducts([newItem, ...products]);
    setNewName("");
    setNewPrice("");
    setNewStock("");
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 text-[#3D2E24] font-sans pb-12">
      {/* Header */}
      <header className="flex flex-col gap-4 rounded-3xl bg-[#F3EDD8]/80 p-6 backdrop-blur-[12px] border border-[#BDD390] shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#3D2E24]">Menu & Products Management</h1>
          <p className="text-sm font-medium text-[#3D2E24]/70">Add, edit, and track CozyCup café items in real-time.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 rounded-2xl bg-[#3D2E24] text-[#BDD390] px-5 py-3 text-xs font-black shadow-md hover:brightness-110 transition-all"
        >
          <Plus className="h-4 w-4" /> {isAdding ? "Close Form" : "Add New Item"}
        </button>
      </header>

      {/* Add Product Inline Form Drawer */}
      {isAdding && (
        <form onSubmit={handleAddProduct} className="rounded-3xl bg-[#F3EDD8] p-6 border-2 border-[#3D2E24]/20 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-black text-[#3D2E24] flex items-center gap-2">
            <Coffee className="h-5 w-5" /> Add New Café Item
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label className="block text-xs font-bold text-[#3D2E24]/70 mb-1">Item Name</label>
              <input
                type="text"
                placeholder="e.g. Spanish Latte"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-xl border border-[#BDD390] bg-white/80 p-2.5 text-sm font-medium focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3D2E24]/70 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full rounded-xl border border-[#BDD390] bg-white/80 p-2.5 text-sm font-medium focus:outline-none"
              >
                <option value="Espresso & Coffee">Espresso & Coffee</option>
                <option value="Cold Beverages">Cold Beverages</option>
                <option value="Bakery & Pastry">Bakery & Pastry</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3D2E24]/70 mb-1">Price (PKR)</label>
              <input
                type="number"
                placeholder="550"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full rounded-xl border border-[#BDD390] bg-white/80 p-2.5 text-sm font-medium focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3D2E24]/70 mb-1">Initial Stock Units</label>
              <input
                type="number"
                placeholder="25"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                className="w-full rounded-xl border border-[#BDD390] bg-white/80 p-2.5 text-sm font-medium focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded-xl bg-white/80 px-4 py-2 text-xs font-bold text-[#3D2E24] border border-[#BDD390]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#3D2E24] text-[#BDD390] px-6 py-2 text-xs font-black shadow-md"
            >
              Save Item
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3D2E24]/50" />
          <input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-[#BDD390] bg-white/60 py-2.5 pl-10 pr-4 text-sm font-medium text-[#3D2E24] placeholder-[#3D2E24]/40 focus:outline-none backdrop-blur-md shadow-sm"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {["All", "Espresso & Coffee", "Cold Beverages", "Bakery & Pastry", "Desserts"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-[#3D2E24] text-[#BDD390] shadow-sm"
                  : "bg-[#F3EDD8]/60 text-[#3D2E24] border border-[#BDD390]/60 hover:bg-[#BDD390]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#BDD390]/60">
            <thead>
              <tr>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Item Name</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Category</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Price</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Stock</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Status</th>
                <th className="py-3 text-right text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDD390]/30">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-[#3D2E24]/60">
                    No items found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="transition-colors hover:bg-white/40">
                    <td className="py-4 text-xs font-black text-[#3D2E24] flex items-center gap-2">
                      <div className="h-8 w-8 rounded-xl bg-[#BDD390] flex items-center justify-center text-[#3D2E24]">
                        <Coffee className="h-4 w-4" />
                      </div>
                      {product.name}
                    </td>
                    <td className="py-4 text-xs font-medium text-[#3D2E24]/80">{product.category}</td>
                    <td className="py-4 text-xs font-bold text-[#3D2E24]">PKR {product.price}</td>
                    <td className="py-4 text-xs font-medium text-[#3D2E24]">{product.stock} units</td>
                    <td className="py-4 text-xs">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                          product.status === "Available"
                            ? "bg-emerald-200 text-emerald-900 border border-emerald-300"
                            : "bg-rose-200 text-rose-900 border border-rose-300"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="py-4 text-right space-x-2">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded-xl bg-white/80 p-2 text-rose-700 hover:bg-rose-700 hover:text-white transition-all shadow-sm border border-[#BDD390]"
                        title="Delete Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}