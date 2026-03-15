import { jsPDF } from 'jspdf';
import { Printer, Download, X, CheckCircle } from 'lucide-react';

const ReceiptModal = ({ isOpen, onClose, cartItems, total, subtotal, tax }) => {
  if (!isOpen) return null;

  const dateObject = new Date();
  const dateStr = dateObject.toLocaleDateString();
  const timeStr = dateObject.toLocaleTimeString();
  const receiptId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  const generatePDF = (mode = 'download') => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 200] // Thermal receipt format
    });

    let y = 10;
    const center = 40;

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Quick Basket", center, y, { align: "center" });
    y += 6;
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Sector 404, Server Street", center, y, { align: "center" });
    y += 4;
    doc.text("Cloud Market, Internet, PIN: 101010", center, y, { align: "center" });
    y += 4;
    doc.text("Tel: 011-23456789", center, y, { align: "center" });
    y += 8;

    // Metadata
    doc.setFontSize(8);
    doc.text(`Receipt #: ${receiptId}`, 5, y);
    y += 4;
    doc.text(`Date: ${dateStr} ${timeStr}`, 5, y);
    y += 6;

    // Divider
    doc.setLineDash([1, 1], 0);
    doc.line(5, y, 75, y);
    y += 5;

    // Items Header
    doc.setFont("helvetica", "bold");
    doc.text("Item", 5, y);
    doc.text("Qty", 45, y);
    doc.text("Price", 55, y);
    doc.text("Total", 75, y, { align: "right" });
    y += 3;

    // Divider
    doc.line(5, y, 75, y);
    y += 4;

    // Items
    doc.setFont("helvetica", "normal");
    cartItems.forEach(item => {
      const itemName = item.name.length > 20 ? item.name.substring(0, 18) + ".." : item.name;
      doc.text(itemName, 5, y);
      doc.text(item.quantity.toString(), 46, y);
      doc.text((item.price).toFixed(2), 55, y);
      doc.text((item.price * item.quantity).toFixed(2), 75, y, { align: "right" });
      y += 5;
    });

    // Divider
    y += 2;
    doc.line(5, y, 75, y);
    y += 5;

    // Totals
    doc.text("Subtotal:", 45, y);
    doc.text(subtotal.toFixed(2), 75, y, { align: "right" });
    y += 4;
    
    doc.text("Tax (5%):", 45, y);
    doc.text(tax.toFixed(2), 75, y, { align: "right" });
    y += 4;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("TOTAL:", 45, y);
    doc.text("INR " + total.toFixed(2), 75, y, { align: "right" });
    y += 10;

    // Footer
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Thank You! Visit Again!", center, y, { align: "center" });
    y += 5;
    
    // Barcode mock
    doc.setFont("courier", "normal");
    doc.text(`*${receiptId}*`, center, y, { align: "center" });

    if (mode === 'print') {
      doc.autoPrint();
      window.open(doc.output('bloburl'), '_blank');
    } else {
      doc.save(`Receipt_${receiptId}.pdf`);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-sm overflow-hidden flex flex-col max-h-[90vh] border-4 border-emerald-100 animate-slide-up transform transition-all relative">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        <div className="px-6 py-5 bg-emerald-50/50 border-b border-emerald-100 flex justify-between items-center mt-2">
          <h2 className="text-xl font-black flex items-center gap-2 text-emerald-600 tracking-tight">
            <CheckCircle className="w-6 h-6" /> Order Complete
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-rose-100 text-slate-400 hover:text-rose-500 rounded-xl transition-colors active:scale-95">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8 flex-1 overflow-y-auto bg-slate-50">
          {/* Thermal Receipt Body */}
          <div className="bg-white p-6 rounded shadow-md border border-slate-200 font-mono text-sm max-w-[300px] mx-auto text-slate-800 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-slate-50 flex justify-around">
               {/* Serrated edge effect */}
               {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-transparent border-b-2 border-r-2 border-slate-200 rotate-45 transform origin-bottom-left -translate-y-1"></div>
               ))}
            </div>

            <div className="text-center mb-6 pt-4">
              <h3 className="font-bold text-lg uppercase tracking-widest text-black">Quick Basket</h3>
              <p className="text-xs text-slate-500">Sector 404, Server St<br/>Cloud Market, PIN: 101010<br/>011-23456789</p>
              <div className="mt-4 text-xs font-semibold">
                <p>Receipt #: {receiptId}</p>
                <p>{dateStr} {timeStr}</p>
              </div>
            </div>
            
            <div className="border-t border-b border-dashed border-slate-300 py-4 mb-4">
              <div className="flex justify-between font-bold mb-3 text-black">
                <span>Item</span>
                <span>Total</span>
              </div>
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs mb-2 items-start">
                  <div className="flex-1 pr-2">
                    <span className="block font-medium text-black">{item.name}</span>
                    <span className="text-slate-500">{item.quantity} x ₹{(item.price).toFixed(2)}</span>
                  </div>
                  <span className="font-bold text-black">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-1.5 mb-6 text-xs text-right">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Tax (5%):</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base mt-4 pt-3 border-t-2 border-slate-800 text-black">
                <span className="uppercase tracking-widest">TOTAL:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="text-center text-xs text-slate-500 pt-5 border-t border-dashed border-slate-300">
              <p className="font-bold text-slate-700">Thank You! Visit Again!</p>
              <p className="mt-2 font-mono text-[10px] tracking-widest">*{receiptId}*</p>
            </div>
          </div>
        </div>
        
        <div className="p-5 border-t border-slate-100 bg-white grid grid-cols-2 gap-4 shrink-0">
          <button 
            onClick={() => generatePDF('download')}
            className="flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-600 font-extrabold uppercase tracking-wide rounded-2xl hover:bg-slate-200 transition-colors shadow-sm active:scale-95"
          >
            <Download className="w-5 h-5" /> Save PDF
          </button>
          <button 
            onClick={() => generatePDF('print')}
            className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black uppercase tracking-wide rounded-2xl hover:opacity-90 hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex-1 active:scale-95 shadow-md shadow-emerald-500/20"
          >
            <Printer className="w-5 h-5" /> Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
