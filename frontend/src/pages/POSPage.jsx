import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import BarcodeScanner from '../components/BarcodeScanner';
import Cart from '../components/Cart';
import ReceiptModal from '../components/ReceiptModal';
import { productAPI, saleAPI } from '../services/api';
import { playBeep } from '../utils/sound';
import { Search, Plus, AlertCircle } from 'lucide-react';

const POSPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [manualBarcode, setManualBarcode] = useState('');
  
  // Modal states
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  const barcodeInputRef = useRef(null);

  const fetchProductAndAdd = async (barcode) => {
    try {
      // First check if already in cart
      const existingIdx = cartItems.findIndex(item => item.barcode === barcode);
      if (existingIdx >= 0) {
        updateQuantity(cartItems[existingIdx].id, 1);
        playBeep();
        toast.info(`Increased quantity for ${cartItems[existingIdx].name}`, {
          icon: '📦'
        });
        return;
      }

      // Fetch from API
      const product = await productAPI.getByBarcode(barcode);
      setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
      playBeep();
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      console.error(err);
      toast.error(`Product ${barcode} not found!`);
      // Play error sound (deeper beep)
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.3);
      } catch (e) {}
    }
  };

  const handleScan = (barcode) => {
    if (barcode) {
      fetchProductAndAdd(barcode);
    }
  };

  const handleManualAdd = (e) => {
    e.preventDefault();
    if (manualBarcode.trim()) {
      fetchProductAndAdd(manualBarcode.trim());
      setManualBarcode('');
    }
  };

  const updateQuantity = (id, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + change) };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.info("Item removed from cart");
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    try {
      const saleData = {
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };
      
      const createdSale = await saleAPI.create(saleData);
      
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.05;
      
      setLastOrderDetails({
        cartItems: [...cartItems],
        total: createdSale.total_amount,
        subtotal,
        tax
      });
      
      setShowReceipt(true);
      setCartItems([]);
      toast.success("Checkout completed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-6rem)]">
      
      {/* LEFT SIDE: Scanner and Manual Entry */}
      <div className="lg:col-span-8 space-y-6 flex flex-col h-full">
        
        {/* Quick Registration Card */}
        <div className="bg-card p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col gap-4 animate-fade-in shrink-0 mt-2">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Quick Registration</h2>
          
          <form onSubmit={handleManualAdd} className="flex gap-4 items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
              <input 
                ref={barcodeInputRef}
                type="text" 
                placeholder="Enter barcode number..." 
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-full bg-slate-50 text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                autoFocus
              />
            </div>
            <button 
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-full transition-colors active:scale-95 flex items-center gap-2 text-sm shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </form>
        </div>
        
        {/* Live Viewfinder Card */}
        <div className="bg-card rounded-2xl shadow-md border border-slate-100 flex-1 flex flex-col overflow-hidden animate-fade-in mb-2 mt-2 object-cover">
          <BarcodeScanner onScan={handleScan} />
        </div>
        
      </div>
      
      {/* RIGHT SIDE: Cart */}
      <div className="lg:col-span-4 h-full animate-slide-in-right mt-2 pb-2">
        <Cart 
          items={cartItems} 
          onUpdateQuantity={updateQuantity} 
          onRemove={removeItem}
          onCheckout={handleCheckout}
        />
      </div>

      {showReceipt && lastOrderDetails && (
        <ReceiptModal 
          isOpen={showReceipt} 
          onClose={() => setShowReceipt(false)}
          cartItems={lastOrderDetails.cartItems}
          total={lastOrderDetails.total}
          subtotal={lastOrderDetails.subtotal}
          tax={lastOrderDetails.tax}
        />
      )}
    </div>
  );
};

export default POSPage;
