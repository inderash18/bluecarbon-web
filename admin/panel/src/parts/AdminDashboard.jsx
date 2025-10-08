import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  // Modern, professional color palette accent for NGO performance
  const ngoAccent = "border-teal-500 bg-teal-50";
  const [ngos, setNgos] = useState([
    { name: "NGO A", tokensMinted: 500 },
    { name: "NGO B", tokensMinted: 300 },
    { name: "NGO C", tokensMinted: 800 },
  ]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/transactions");
        setTransactions(res.data);
      } catch (err) {
        console.log("Error fetching transactions:", err);
      }
    }

    fetchTransactions();
  }, []);

  const handleMint = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/mint", {
        to: wallet,
        amount: parseInt(amount),
      });
      alert("Tokens minted! Tx hash: " + res.data.tx_hash);
      setWallet("");
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Minting failed: " + err.response?.data?.error || err.message);
    }
  };

return (
  <div className="min-h-screen w-full flex bg-gray-50 font-sans overflow-hidden">

    {/* Main content area */}
    <div className="flex-1 flex flex-col min-h-screen w-full transition-all duration-300 ease-in-out">
      
      {/* Top Title Bar */}
      <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-teal-900 select-none">BlueCarbon Admin Panel</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-teal-300 flex items-center justify-center text-teal-900 font-bold uppercase select-none">
            A
          </div>
          <span className="text-gray-700 font-medium select-none">Admin</span>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 w-full flex-1 bg-gray-50 overflow-y-auto space-y-8">

        {/* Mint tokens section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-teal-700 select-none">
            Mint Tokens
          </h2>
          <div className="flex flex-wrap gap-5 items-center w-full">
            <input
              type="text"
              placeholder="Wallet address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white transition"
            />
            <button
              onClick={handleMint}
              className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-teal-700 hover:shadow-lg transition duration-300"
            >
              Mint
            </button>
          </div>
        </div>

        {/* NGO performance */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-teal-700 select-none">
            NGO Performance
          </h2>
          <ul className="space-y-4">
            {ngos.map((ngo, idx) => (
              <li
                key={idx}
                className={`p-5 border rounded-lg flex justify-between items-center transition shadow-sm hover:shadow-md cursor-default
                  ${ngoAccent} hover:bg-teal-100/70`}
              >
                <span className="font-medium text-gray-900 select-text">{ngo.name}</span>
                <span className="text-gray-800 select-text">{ngo.tokensMinted} tokens</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Transaction history */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full hover:shadow-lg transition-shadow duration-300 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-6 text-teal-700 select-none">
            Transactions
          </h2>
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 select-none">
                <th className="border px-5 py-3 text-left font-medium">Tx Hash</th>
                <th className="border px-5 py-3 text-left font-medium">From</th>
                <th className="border px-5 py-3 text-left font-medium">To</th>
                <th className="border px-5 py-3 text-left font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500 select-none">
                    No transactions yet.
                  </td>
                </tr>
              ) : (
                transactions.map((tx, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-teal-50 transition duration-150 text-gray-700"
                  >
                    <td className="border px-5 py-3 break-all">{tx.hash}</td>
                    <td className="border px-5 py-3 break-all">{tx.from}</td>
                    <td className="border px-5 py-3 break-all">{tx.to}</td>
                    <td className="border px-5 py-3">{tx.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
);
}