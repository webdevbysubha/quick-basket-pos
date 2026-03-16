import { useState, useCallback } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { playBeep } from '../utils/sound';
import { Camera, CameraOff, Power, ScanLine } from 'lucide-react';

const BarcodeScanner = ({ onScan }) => {
  const [cameraActive, setCameraActive] = useState(true);
  const [lastScanned, setLastScanned] = useState({ code: null, time: 0 });

  const handleScan = useCallback((err, result) => {
    if (result) {
      const decodedText = result.text;
      const now = Date.now();
      
      // Debounce: prevent same barcode from being scanned within 1.5 seconds
      if (decodedText === lastScanned.code && now - lastScanned.time < 1500) {
        return;
      }
      
      setLastScanned({ code: decodedText, time: now });
      playBeep();
      onScan(decodedText);
    }
  }, [lastScanned, onScan]);

  return (
    <div className="flex flex-col bg-card rounded-2xl w-full">
      <div className="flex justify-between items-center p-4 border-b border-slate-100 shrink-0">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <ScanLine className="w-5 h-5 text-primary"/>
          Live Viewfinder
        </h3>
        <button 
          onClick={() => setCameraActive(!cameraActive)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${cameraActive ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
        >
          {cameraActive ? <><Power className="w-4 h-4" /> Pause Feed</> : <><Camera className="w-4 h-4" /> Resume Scan</>}
        </button>
      </div>
      
      <div className="w-full relative bg-[#1a1c23] flex items-center justify-center overflow-hidden min-h-[300px]">
        {cameraActive ? (
          <BarcodeScannerComponent
            width="100%"
            height="100%"
            onUpdate={handleScan}
            videoConstraints={{ facingMode: 'environment' }}
          />
        ) : (
          <div className="text-slate-400 flex flex-col items-center animate-fade-in relative z-10 p-8 text-center">
            <div className="bg-slate-800 p-6 rounded-full mb-4 shadow-inner border border-slate-700/50">
              <CameraOff className="w-10 h-10 text-slate-500" />
            </div>
            <p className="text-base font-bold text-slate-300">Camera Paused</p>
            <p className="text-xs opacity-70 mt-2 max-w-[200px]">Click 'Resume Scan' when you are ready to capture barcodes.</p>
          </div>
        )}
        
        {/* Scanning targeting overlay box */}
        {cameraActive && (
          <div className="absolute inset-0 pointer-events-none transition-all duration-300">
            {/* The outer darkening mask */}
            <div className="absolute inset-0 border-[60px] md:border-[100px] border-black/40 backdrop-blur-[1px]"></div>
            
            {/* The glowing frame centered */}
            <div className="absolute top-[60px] bottom-[60px] left-[60px] right-[60px] md:top-[100px] md:bottom-[100px] md:left-[100px] md:right-[100px] border border-primary/40 bg-primary/5 shadow-[inset_0_0_30px_rgba(108,99,255,0.15)] flex flex-col">
              
              {/* Corner markers */}
              <div className="absolute -top-0.5 -left-0.5 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg shadow-[0_0_10px_rgba(108,99,255,0.4)]"></div>
              <div className="absolute -top-0.5 -right-0.5 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg shadow-[0_0_10px_rgba(108,99,255,0.4)]"></div>
              <div className="absolute -bottom-0.5 -left-0.5 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg shadow-[0_0_10px_rgba(108,99,255,0.4)]"></div>
              <div className="absolute -bottom-0.5 -right-0.5 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg shadow-[0_0_10px_rgba(108,99,255,0.4)]"></div>
              
              {/* Animated Laser line */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent absolute top-1/2 -translate-y-1/2 shadow-[0_0_15px_3px_rgba(108,99,255,0.8)] animate-scan-line"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;
