"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import QRCode from "qrcode";
import { motion } from "framer-motion";

export default function ParkingQRPage() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    const encodedData = searchParams.get("data");

    if (!encodedData) {
      setTimeout(() => setLoading(false), 3500);
      return;
    }

    try {
      const decodedJson = atob(encodedData);
      const data = JSON.parse(decodedJson);
      const { vehicle, date, time } = data;

      if (!vehicle || !date || !time) {
        setTimeout(() => setLoading(false), 3500);
        return;
      }

      setVehicle(vehicle);
      setEntryDate(date);
      setEntryTime(time);

      const entryDateTime = new Date(`${date} ${time}`);
      const now = new Date();

      const currentFormatted = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setExitTime(currentFormatted);

      const diffMs = now.getTime() - entryDateTime.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      setDuration(`${hours}h ${minutes}m`);

      const totalAmount = diffHours <= 1 ? 25 : Math.ceil(diffHours) * 25;
      setAmount(totalAmount);

      const qrUrl = `${window.location.origin}/?data=${encodedData}`;
      QRCode.toDataURL(qrUrl)
        .then((dataUrl) => setQrDataUrl(dataUrl))
        .catch(console.error)
        .finally(() => {
          // ⏱ Force 3.5s loading duration
          setTimeout(() => setLoading(false), 3500);
        });
    } catch (err) {
      console.error("Invalid or tampered QR data:", err);
      setTimeout(() => setLoading(false), 3500);
    }
  }, [searchParams]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `QR_${vehicle}_${entryDate}.png`;
    link.click();
  };

  // ⏳ Loading Page (3.5s)
  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          ></motion.div>
          <h1 className="mt-6 text-2xl font-bold text-gray-800">Mall Parking</h1>
          <p className="mt-2 text-gray-600">Loading parking details...</p>
        </motion.div>
      </main>
    );
  }

  // ✅ Main Parking Summary
  return (
    <motion.main
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🚗 Mall Parking Summary
        </h1>

        {vehicle ? (
          <motion.div
            className="space-y-3 text-gray-700"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p>
              <span className="font-semibold">Vehicle No:</span> {vehicle}
            </p>
            <p>
              <span className="font-semibold">Entry Date:</span> {entryDate}
            </p>
            <p>
              <span className="font-semibold">Entry Time:</span> {entryTime}
            </p>
            <p>
              <span className="font-semibold">Exit Time:</span> {exitTime}
            </p>
            <p>
              <span className="font-semibold">Duration:</span> {duration}
            </p>
            <p className="text-xl font-bold text-red-600">
              💰 Parking Fee: ₹{amount ?? "--"}
            </p>

            {qrDataUrl && (
              <div className="flex flex-col items-center mt-6 space-y-3">
                <img
                  src={qrDataUrl}
                  alt="Parking QR Code"
                  className="w-40 h-40 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition"
                >
                  ⬇️ Download QR
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <p className="text-gray-500">Invalid or missing QR data</p>
        )}
      </div>
    </motion.main>
  );
}
