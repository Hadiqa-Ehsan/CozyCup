"use client";

import { useState } from "react";
import { Coffee, Plus, Search, Trash2, Edit3 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Available" | "Out of Stock";
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "JS Bread Roll", category: "Bakery", price: 495, stock: 10, status: "Available" },
    { id: "2", name: "JS Cheese Crust Roll", category: "Bakery", price: 595, stock: 10, status: "Available" },
    { id: "7", name: "White Bread", category: "Bakery", price: 248, stock: 10, status: "Available" },
    { id: "8", name: "Brown Bread", category: "Bakery", price: 298, stock: 10, status: "Available" },
    { id: "21", name: "Chocolate Cake", category: "Bakery", price: 1598, stock: 10, status: "Available" },
    { id: "22", name: "Vanilla Cake", category: "Bakery", price: 1298, stock: 10, status: "Available" },
    { id: "23", name: "Cream Pastry", category: "Bakery", price: 398, stock: 10, status: "Available" },
    { id: "24", name: "Fruit Pastry", category: "Bakery", price: 498, stock: 10, status: "Available" },
    { id: "25", name: "Glazed Donut", category: "Bakery", price: 198, stock: 10, status: "Available" },
    { id: "26", name: "Chocolate Donut", category: "Bakery", price: 248, stock: 10, status: "Available" },
    { id: "27", name: "Walnut Brownie", category: "Bakery", price: 298, stock: 10, status: "Available" },
    { id: "28", name: "Chocolate Brownie", category: "Bakery", price: 348, stock: 10, status: "Available" },
    { id: "29", name: "Burger Bun", category: "Bakery", price: 148, stock: 10, status: "Available" },
    { id: "30", name: "Sandwich Bun", category: "Bakery", price: 198, stock: 10, status: "Available" },
    { id: "31", name: "Butter Biscuit", category: "Bakery", price: 198, stock: 10, status: "Available" },
    { id: "32", name: "Chocolate Biscuit", category: "Bakery", price: 248, stock: 10, status: "Available" },
    { id: "33", name: "Plain Rusk", category: "Bakery", price: 298, stock: 10, status: "Available" },
    { id: "34", name: "Sweet Rusk", category: "Bakery", price: 348, stock: 10, status: "Available" },
    { id: "9", name: "Fresh Organic Milk", category: "Dairy", price: 248, stock: 10, status: "Available" },
    { id: "35", name: "Full Cream Milk", category: "Dairy", price: 248, stock: 10, status: "Available" },
    { id: "36", name: "Skimmed Milk", category: "Dairy", price: 198, stock: 10, status: "Available" },
    { id: "37", name: "Plain Yogurt", category: "Dairy", price: 198, stock: 10, status: "Available" },
    { id: "38", name: "Fruit Yogurt", category: "Dairy", price: 248, stock: 10, status: "Available" },
    { id: "39", name: "Cheddar Cheese", category: "Dairy", price: 398, stock: 10, status: "Available" },
    { id: "40", name: "Mozzarella Cheese", category: "Dairy", price: 498, stock: 10, status: "Available" },
    { id: "41", name: "Salted Butter", category: "Dairy", price: 298, stock: 10, status: "Available" },
    { id: "42", name: "Unsalted Butter", category: "Dairy", price: 298, stock: 10, status: "Available" },
    { id: "43", name: "Whipping Cream", category: "Dairy", price: 348, stock: 10, status: "Available" },
    { id: "44", name: "Sour Cream", category: "Dairy", price: 398, stock: 10, status: "Available" },
    { id: "45", name: "Pure Ghee", category: "Dairy", price: 598, stock: 10, status: "Available" },
    { id: "46", name: "Vanilla Ice Cream", category: "Dairy", price: 998, stock: 10, status: "Available" },
    { id: "47", name: "Chocolate Ice Cream", category: "Dairy", price: 1098, stock: 10, status: "Available" },
    { id: "11", name: "Mango Milk Cake Special", category: "Sweets", price: 1998, stock: 10, status: "Available" },
    { id: "49", name: "Mango Cake", category: "Sweets", price: 1998, stock: 10, status: "Available" },
    { id: "50", name: "Chocolate Cake", category: "Sweets", price: 1598, stock: 10, status: "Available" },
    { id: "51", name: "Walnut Brownie", category: "Sweets", price: 298, stock: 10, status: "Available" },
    { id: "52", name: "Glazed Donut", category: "Sweets", price: 198, stock: 10, status: "Available" },
    { id: "53", name: "Vanilla Cupcake", category: "Sweets", price: 248, stock: 10, status: "Available" },
    { id: "54", name: "Cream Pastry", category: "Sweets", price: 298, stock: 10, status: "Available" },
    { id: "55", name: "Gulab Jamun", category: "Sweets", price: 398, stock: 10, status: "Available" },
    { id: "56", name: "Jalebi", category: "Sweets", price: 298, stock: 10, status: "Available" },
    { id: "13", name: "Classic Chicken Burger", category: "Fast Food", price: 498, stock: 10, status: "Available" },
    { id: "57", name: "Crispy Chicken Burger", category: "Fast Food", price: 498, stock: 10, status: "Available" },
    { id: "58", name: "Zinger Burger", category: "Fast Food", price: 698, stock: 10, status: "Available" },
    { id: "59", name: "French Fries", category: "Fast Food", price: 298, stock: 10, status: "Available" },
    { id: "60", name: "Chicken Nuggets", category: "Fast Food", price: 398, stock: 10, status: "Available" },
    { id: "61", name: "Peri Peri Chicken", category: "Fast Food", price: 598, stock: 10, status: "Available" },
    { id: "62", name: "Grilled Chicken Quarter", category: "Fast Food", price: 998, stock: 10, status: "Available" },
    { id: "15", name: "Special Noodle Bowl", category: "Pan Asian", price: 598, stock: 10, status: "Available" },
    { id: "63", name: "Chow Mein Noodles", category: "Pan Asian", price: 598, stock: 10, status: "Available" },
    { id: "64", name: "Pad Thai", category: "Pan Asian", price: 698, stock: 10, status: "Available" },
    { id: "65", name: "Egg Fried Rice", category: "Pan Asian", price: 498, stock: 10, status: "Available" },
    { id: "66", name: "Chicken Fried Rice", category: "Pan Asian", price: 598, stock: 10, status: "Available" },
    { id: "67", name: "Chicken Chow Mein", category: "Pan Asian", price: 598, stock: 10, status: "Available" },
    { id: "68", name: "Vegetable Spring Rolls", category: "Pan Asian", price: 398, stock: 10, status: "Available" },
    { id: "69", name: "Chicken Dumplings", category: "Pan Asian", price: 498, stock: 10, status: "Available" },
    { id: "70", name: "Vegetable Stir Fry", category: "Pan Asian", price: 498, stock: 10, status: "Available" },
    { id: "17", name: "Assorted Snacks", category: "Grocery", price: 298, stock: 10, status: "Available" },
    { id: "71", name: "Potato Chips", category: "Grocery", price: 298, stock: 10, status: "Available" },
    { id: "72", name: "Mixed Nuts", category: "Grocery", price: 798, stock: 10, status: "Available" },
    { id: "73", name: "Chili Sauce", category: "Grocery", price: 198, stock: 10, status: "Available" },
    { id: "74", name: "Black Pepper", category: "Grocery", price: 298, stock: 10, status: "Available" },
    { id: "75", name: "Soft Drink", category: "Grocery", price: 148, stock: 10, status: "Available" },
    { id: "76", name: "Fruit Juice", category: "Grocery", price: 198, stock: 10, status: "Available" },
    { id: "77", name: "Olive Oil", category: "Grocery", price: 898, stock: 10, status: "Available" },
    { id: "78", name: "Canola Oil", category: "Grocery", price: 698, stock: 10, status: "Available" },
    { id: "19", name: "Deli Chicken Breast", category: "Deli", price: 798, stock: 10, status: "Available" },
    { id: "79", name: "Roast Chicken", category: "Deli", price: 798, stock: 10, status: "Available" },
    { id: "80", name: "Roast Beef", category: "Deli", price: 998, stock: 10, status: "Available" },
    { id: "81", name: "Ham Slices", category: "Deli", price: 698, stock: 10, status: "Available" },
    { id: "82", name: "Salami Slices", category: "Deli", price: 798, stock: 10, status: "Available" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Bakery", "Dairy", "Sweets", "Fast Food", "Pan Asian", "Grocery", "Deli"];

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Bakery");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleOpenAdd = () => {
    setEditingId(null);
    setName("");
    setCategory("Bakery");
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
      const newItem: Product = {
        id: Date.now().toString(),
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

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const toggleStatus = (id: string) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === "Available" ? "Out of Stock" : "Available",
            }
          : p
      )
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 text-[#3D2E24] font-sans pb-12">
      <header className="flex flex-col gap-4 rounded-3xl bg-[#F3EDD8]/80 p-6 backdrop-blur-[12px] border border-[#BDD390] shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#3D2E24]">Menu & Products Inventory</h1>
          <p className="text-sm font-medium text-[#3D2E24]/70">Manage all actual store items across categories.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-2xl bg-[#3D2E24] text-[#BDD390] px-5 py-3 text-xs font-black shadow-md hover:brightness-110 transition-all"
        >
          <Plus className="h-4 w-4" /> Add New Item
        </button>
      </header>

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

      <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#BDD390]/60">
            <thead>
              <tr>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Item Name</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Category</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Price</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Stock</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Status (Click to Toggle)</th>
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
                      <button
                        onClick={() => toggleStatus(product.id)}
                        title="Click to toggle status"
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold cursor-pointer transition-transform active:scale-95 ${
                          product.status === "Available"
                            ? "bg-emerald-200 text-emerald-900 border border-emerald-300 hover:bg-emerald-300"
                            : "bg-rose-200 text-rose-900 border border-rose-300 hover:bg-rose-300"
                        }`}
                      >
                        {product.status} 🔄
                      </button>
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