"use client";

import { useState } from "react";
import { Coffee, Plus, Search, Trash2, Edit3, X, Check } from "lucide-react";

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
    { id: 1, name: "Caramel Macchiato", category: "Beverages", price: 580, stock: 45, status: "Available" },
    { id: 2, name: "Artisan Butter Croissant", category: "Bakery", price: 420, stock: 25, status: "Available" },
    { id: 3, name: "Organic Cheddar Slice", category: "Dairy", price: 350, stock: 18, status: "Available" },
    { id: 4, name: "Crispy Zinger Burger", category: "Fast Food", price: 750, stock: 30, status: "Available" },
    { id: 5, name: "Belgian Chocolate Fudge", category: "Sweets", price: 490, stock: 12, status: "Available" },
    { id: 6, name: "Smoked Turkey Deli Sandwich", category: "Deli", price: 680, stock: 10, status: "Available" },
    { id: 7, name: "Teriyaki Chicken Bao", category: "Pan Asian", price: 820, stock: 15, status: "Available" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Bakery", "Dairy", "Fast Food", "Sweets", "Deli", "Pan Asian", "Beverages"];

  // Add & Edit state
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Beverages");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleOpenAdd = () => {
    setEditingId(null);
    setName("");
    setCategory("Beverages");
    setPrice("");
    setStock("");
    setIsAdding(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setIsAdding(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) return;

    if (editingId !== null) {
      // Edit mode
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name,
                category,
                price: Number(price),
                stock: Number(stock),
                status: Number(stock) > 0 ? "Available" : "Out of Stock",
              }
            : p
        )
      );
    } else {
      // Add mode
      const newItem: Product = {
        id: Date.now(),
        name,
        category,
        price: Number(price),
        stock: Number(stock),
        status: Number(stock) > 0 ? "Available" : "Out of Stock",
      };
      setProducts([newItem, ...products]);
    }

    setIsAdding(false);
    setEditingId(null);
    setName("");
    setPrice("");
    setStock("");
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
          <h1 className="text-2xl font-black text-[#3D2E24]">Menu & Products Inventory</h1>
          <p className="text-sm font-medium text-[#3D2E24]/70">Manage your store items across all 7 categories.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-2xl bg-[#3D2E24] text-[#BDD390] px-5 py-3 text-xs font-black shadow-md hover:brightness-110 transition-all"
        >
          <Plus className="h-4 w-4" /> Add New Item
        </button>
      </header>

      {/* Add / Edit Form Modal/Drawer */}
      {isAdding && (
        <form onSubmit={handleSaveProduct} className="rounded-3xl bg-[#F3EDD8] p-6 border-2 border-[#3D2E24]/20 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-black text-[#3D2E24] flex items-center gap-2">
            <Coffee className="h-5 w-5" /> {editingId !== null ? "Edit Product Item" : "Add New Product"}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label className="block text-xs font-bold text-[#3D2E24]/70 mb-1">Item Name</label>
              <input
                type="text"
                placeholder="e.g. Spanish Latte"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-[#BDD390] bg-white/80 p-2.5 text-sm font-medium focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3D2E24]/70 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-[#BDD390] bg-white/80 p-2.5 text-sm font-medium focus:outline-none"
              >
                {categories.filter(c => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3D2E24]/70 mb-1">Price (PKR)</label>
              <input
                type="number"
                placeholder="550"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-[#BDD390] bg-white/80 p-2.5 text-sm font-medium focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3D2E24]/70 mb-1">Stock Units</label>
              <input
                type="number"
                placeholder="25"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
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
              {editingId !== null ? "Update Item" : "Save Item"}
            </button>
          </div>
        </form>
      )}

      {/* Search and Category Filter Pills */}
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

        {/* 7 Categories Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
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
                    No items found matching your filters.
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
                    <td className="py-4 text-xs font-medium text-[#3D2E24]/80">
                      <span className="bg-[#BDD390]/50 px-2.5 py-1 rounded-lg font-bold">{product.category}</span>
                    </td>
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
                        onClick={() => handleOpenEdit(product)}
                        className="rounded-xl bg-white/80 p-2 text-[#3D2E24] hover:bg-[#3D2E24] hover:text-[#BDD390] transition-all shadow-sm border border-[#BDD390]"
                        title="Edit Item"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
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