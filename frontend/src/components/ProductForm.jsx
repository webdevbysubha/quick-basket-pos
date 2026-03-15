import { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import { Save, X } from 'lucide-react';

const ProductForm = ({ product, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    barcode: '',
    price: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        barcode: product.barcode,
        price: product.price,
        category: product.category || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (product) {
        await productAPI.update(product.id, formData);
      } else {
        await productAPI.create(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] w-full max-w-md border-4 border-fuchsia-100 animate-slide-up relative overflow-hidden">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-fuchsia-500 to-pink-500"></div>

      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-black text-slate-800 tracking-tight">
          {product ? 'Edit Item' : 'New Product'}
        </h3>
        <button onClick={onCancel} className="text-slate-400 hover:text-rose-500 bg-slate-100 hover:bg-rose-50 transition-all p-2 rounded-xl shadow-inner active:scale-90">
          <X className="w-5 h-5"/>
        </button>
      </div>
      
      {error && <div className="bg-rose-50 border-2 border-rose-100 text-rose-600 p-4 rounded-2xl mb-6 text-sm flex items-center gap-3 font-semibold shadow-inner animate-wiggle"><X className="w-5 h-5 shrink-0 bg-white rounded-full p-0.5 shadow-sm text-rose-500"/>{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-black text-slate-500 uppercase tracking-widest mb-2 pl-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-900 focus:outline-none focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100 transition-all shadow-inner font-bold text-lg"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-black text-slate-500 uppercase tracking-widest mb-2 pl-1">Barcode ID</label>
          <input
            type="text"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            className="w-full px-5 py-4 border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-900 focus:outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-100 transition-all font-mono shadow-inner tracking-widest font-bold"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-black text-slate-500 uppercase tracking-widest mb-2 pl-1">Price (₹)</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-900 focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 transition-all shadow-inner font-black text-lg text-emerald-700"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-black text-slate-500 uppercase tracking-widest mb-2 pl-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-900 focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all shadow-inner font-bold"
            />
          </div>
        </div>
        
        <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-4 bg-slate-100 text-slate-500 font-extrabold uppercase tracking-wide rounded-2xl hover:bg-slate-200 transition-colors w-1/3 active:scale-95"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex justify-center items-center gap-2 px-6 py-4 bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white font-black uppercase tracking-wide rounded-2xl hover:opacity-90 hover:shadow-lg hover:shadow-fuchsia-500/40 transition-all disabled:opacity-50 active:scale-95"
          >
            <Save className="w-5 h-5" /> {loading ? 'Saving...' : 'Confirm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
