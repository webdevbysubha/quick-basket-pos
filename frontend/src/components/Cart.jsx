import { Trash2, Plus, Minus, PackageOpen } from 'lucide-react';

const Cart = ({ items, onUpdateQuantity, onRemove, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // Assuming 5% tax
  const total = subtotal + tax;

  return (
    <div className="bg-card rounded-2xl shadow-md border border-slate-100 flex flex-col h-full relative overflow-hidden">
      {/* Top Header */}
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white z-10">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">Current Order</h3>
        {items.length > 0 && (
          <span className="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full border border-primary/20">
            {items.length} {items.length === 1 ? 'Item' : 'Items'}
          </span>
        )}
      </div>
      
      {/* Item List Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 animate-fade-in relative">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 border border-slate-200 shadow-inner">
              <ShoppingCartIcon className="w-8 h-8 text-slate-300" />
            </div>
            <p className="font-semibold text-slate-500">Cart is empty</p>
            <p className="text-xs mt-2 text-slate-400 max-w-[180px] text-center">Scan a product or manually add to begin billing.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex flex-row p-3 bg-white rounded-xl shadow-sm border border-slate-100 transition-all animate-slide-up group">
              {/* Product Thumbnail Placeholder */}
              <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mr-4">
                <PackageOpen className="w-6 h-6 text-blue-300" />
              </div>

              <div className="flex flex-col flex-1 justify-center relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 inline-block">{item.barcode}</span>
                  </div>
                  
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-slate-300 hover:text-rose-500 p-1 rounded-lg transition-colors absolute right-0 top-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex justify-between items-end mt-2">
                  <div className="flex items-center gap-1 bg-slate-50 rounded-lg border border-slate-200 p-0.5">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-primary transition-colors disabled:opacity-30 border border-slate-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold w-6 text-center text-slate-800 text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-primary transition-colors border border-slate-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <p className="font-bold text-slate-800 text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Billing Summary Area */}
      <div className="bg-white border-t border-slate-100 p-5 mt-auto z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-slate-500 text-sm">
            <span>Subtotal</span>
            <span className="text-slate-700 font-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-500 text-sm">
            <span>Tax (5%)</span>
            <span className="text-slate-700 font-medium">₹{tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-slate-100 border-dashed my-3 pt-3 flex justify-between items-end">
            <span className="text-slate-500 font-medium text-sm">TOTAL</span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>
        
        <button 
          onClick={onCheckout}
          disabled={items.length === 0}
          className="w-full py-4 bg-gradient-to-r from-accent to-checkoutEnd text-white font-bold rounded-xl hover:opacity-95 hover:shadow-[0_8px_20px_-4px_rgba(0,201,167,0.4)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:shadow-none flex justify-center items-center gap-2 text-base shadow-[0_4px_10px_-2px_rgba(0,201,167,0.3)]"
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

// Helper SVG inside same file
const ShoppingCartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);

export default Cart;
