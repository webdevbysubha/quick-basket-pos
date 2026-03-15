import { useState, useEffect } from 'react';
import { productAPI, saleAPI } from '../services/api';
import ProductForm from '../components/ProductForm';
import { Plus, Edit, Trash2, Tag, Search, IndianRupee, RefreshCw } from 'lucide-react';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Tab states
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    fetchData();
    
    // Auto-refresh when the window regains focus (user navigates back)
    window.addEventListener('focus', fetchData);
    return () => window.removeEventListener('focus', fetchData);
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const data = await productAPI.getAll();
        setProducts(data);
      } else {
        const data = await saleAPI.getAll();
        setSales(data);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productAPI.delete(id);
        fetchData();
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  const handleOpenForm = (product = null) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleFormSuccess = () => {
    handleCloseForm();
    fetchData();
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.barcode.includes(search)
  );

  return (
    <div className="max-w-7xl mx-auto animate-fade-in relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h2 className="text-4xl font-black text-slate-800 flex items-center gap-4 tracking-tight">
          <div className={`p-3 rounded-2xl ${activeTab === 'products' ? 'bg-fuchsia-100 text-fuchsia-600 shadow-inner' : 'bg-emerald-100 text-emerald-600 shadow-inner'}`}>
            {activeTab === 'products' ? <Tag className="w-8 h-8" /> : <IndianRupee className="w-8 h-8" />}
          </div>
          Dashboard
        </h2>

        <div className="flex gap-2">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-3 bg-white text-slate-500 hover:text-primary hover:bg-slate-50 border border-slate-200 shadow-sm rounded-2xl font-bold transition-all disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <div className="flex gap-2 bg-slate-100/80 p-2 rounded-2xl border border-slate-200 shadow-inner w-full md:w-auto">
          <button
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'products' ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-[0_4px_15px_rgba(217,70,239,0.3)] transform scale-[1.02]' : 'text-slate-500 hover:bg-white hover:text-slate-800 hover:shadow-sm'}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold transition-all duration-300 ${activeTab === 'sales' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)] transform scale-[1.02]' : 'text-slate-500 hover:bg-white hover:text-slate-800 hover:shadow-sm'}`}
            onClick={() => setActiveTab('sales')}
          >
            Sales History
          </button>
        </div>
        </div>
      </div>

      {activeTab === 'products' && (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden animate-slide-up">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 items-center bg-fuchsia-50/30">
            <div className="relative w-full sm:w-96 group/search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within/search:text-fuchsia-500 transition-colors" />
              <input
                type="text"
                placeholder="Search products by name or barcode..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-white text-slate-800 focus:outline-none focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100 transition-all font-medium shadow-sm"
              />
            </div>

            <button
              onClick={() => handleOpenForm()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-6 py-3.5 rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-fuchsia-500/30 font-bold active:scale-95"
            >
              <Plus className="w-5 h-5" /> Add New Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-wider border-b border-slate-100">
                  <th className="p-6">Barcode</th>
                  <th className="p-6">Product Name</th>
                  <th className="p-6">Category</th>
                  <th className="p-6 text-right">Price</th>
                  <th className="p-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {loading ? (
                  <tr><td colSpan="5" className="p-16 text-center text-fuchsia-500 flex flex-col items-center"><div className="w-10 h-10 border-4 border-fuchsia-200 border-t-fuchsia-600 rounded-full animate-spin mb-4"></div><span className="font-bold text-slate-500">Loading catalog...</span></td></tr>
                ) : filteredProducts.length === 0 ? (
                  <tr><td colSpan="5" className="p-16 text-center text-slate-400 font-bold text-lg bg-slate-50/50">No products found matching criteria.</td></tr>
                ) : (
                  filteredProducts.map((product, idx) => (
                    <tr key={product.id} className="hover:bg-fuchsia-50/30 transition-colors group animate-fade-in bg-white" style={{ animationDelay: `${idx * 30}ms` }}>
                      <td className="p-6">
                        <span className="font-mono text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                          {product.barcode}
                        </span>
                      </td>
                      <td className="p-6 font-bold text-slate-800 text-base">{product.name}</td>
                      <td className="p-6">
                        <span className="px-4 py-1.5 bg-sky-50 text-sky-600 rounded-full text-xs font-bold border border-sky-100 uppercase tracking-widest shadow-sm">
                          {product.category || 'General'}
                        </span>
                      </td>
                      <td className="p-6 text-right font-black text-lg text-slate-800">₹{product.price.toFixed(2)}</td>
                      <td className="p-6">
                        <div className="flex justify-center gap-3 opacity-100 lg:opacity-40 lg:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleOpenForm(product)}
                            className="p-2.5 text-blue-500 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all hover:scale-110 shadow-sm border border-transparent hover:border-blue-100 bg-white"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2.5 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all hover:scale-110 shadow-sm border border-transparent hover:border-rose-100 bg-white"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'sales' && (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50/50 text-emerald-800 text-xs font-black uppercase tracking-wider border-b border-emerald-100">
                  <th className="p-6">Receipt / Date</th>
                  <th className="p-6">Purchase Manifest</th>
                  <th className="p-6 text-right">Total Settled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="3" className="p-16 text-center text-emerald-500 flex flex-col items-center"><div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div><span className="font-bold text-slate-500">Loading ledger...</span></td></tr>
                ) : sales.length === 0 ? (
                  <tr><td colSpan="3" className="p-16 text-center text-slate-400 font-bold text-lg bg-slate-50/50">No sales recorded yet.</td></tr>
                ) : (
                  sales.map((sale, idx) => (
                    <tr key={sale.id} className="hover:bg-emerald-50/20 transition-colors animate-fade-in bg-white" style={{ animationDelay: `${idx * 40}ms` }}>
                      <td className="p-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 w-fit px-2 py-0.5 rounded border border-slate-200">ID: {sale.id}</span>
                          <span className="text-slate-800 font-medium">
                            {new Date(sale.datetime + 'Z').toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        </div>
                      </td>
                      <td className="p-6">
                        <ul className="text-sm text-slate-600 space-y-2">
                          {sale.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 w-fit">
                              <span className="font-black text-emerald-600 bg-emerald-100 w-6 h-6 flex items-center justify-center rounded-md text-xs">{item.quantity}</span>
                              <span className="font-semibold">{item.product_name || `Product #${item.product_id}`}</span>
                              <span className="text-slate-500 font-medium">@ ₹{item.price.toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-6 text-right font-black text-2xl text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-teal-600 tracking-tight">
                        ₹{sale.total_amount.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <ProductForm
            product={editingProduct}
            onSuccess={handleFormSuccess}
            onCancel={handleCloseForm}
          />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
