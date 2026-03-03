import { useState } from "react";
import { CreditCard as Edit, Trash2, Plus, X } from "lucide-react";
import Table from "../../components/admin/Table";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { products } from "../../data/mockData";

const Products = () => {
  const [showModal, setShowModal] = useState(false);

  const columns = [
    {
      header: "Image",
      accessor: "image",
      render: (row) => (
        <img
          src={row.image}
          alt={row.name}
          className="w-12 h-12 object-cover rounded-lg"
        />
      ),
    },
    { header: "Name", accessor: "name" },
    { header: "Category", accessor: "category" },
    { header: "Brand", accessor: "brand" },
    {
      header: "Price",
      accessor: "price",
      render: (row) => `$${row.price}`,
    },
    { header: "Stock", accessor: "stock" },
  ];

  const actions = (row) => (
    <>
      <Button variant="outline" size="sm">
        <Edit size={16} />
      </Button>
      <Button variant="danger" size="sm">
        <Trash2 size={16} />
      </Button>
    </>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Products Management
        </h1>
        <p className="text-gray-600">Manage your product catalog.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">All Products</h2>
            <div className="flex items-center gap-3">
              <input
                type="search"
                placeholder="Search products..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Button variant="primary" onClick={() => setShowModal(true)}>
                <Plus size={18} className="mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </div>
        <Table columns={columns} data={products} actions={actions} />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Add New Product</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form className="p-6 space-y-6">
              <Input label="Product Name" placeholder="Enter product name" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Enter product description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Brand" placeholder="Enter brand name" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                    <option>T-Shirt</option>
                    <option>Shirt</option>
                    <option>Jeans</option>
                    <option>Hoodie</option>
                    <option>Jacket</option>
                    <option>Kurta</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Price" type="number" placeholder="0.00" />
                <Input label="Stock" type="number" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="primary" size="lg" className="flex-1">
                  Add Product
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
