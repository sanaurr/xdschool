import { useState } from "react";

export default function App() {
  const [bookings, setBookings] = useState([]);
  const [view, setView] = useState("form");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    facilities: {},
    date: "",
    times: [],
  });

  const facilities = [
    { name: "Swimming Pool", count: 1, price: 50 },
    { name: "Football Field", count: 2, price: 70 },
    { name: "Tennis Court", count: 3, price: 18 },
    { name: "Slazenger Tennis Balls (pack of 3)", count: 5, price: 10 },
    { name: "Volleyball Court", count: 3, price: 12 },
  ];

  const timeSlots = ["8-9am", "9-10am", "10-11am", "11-12pm"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFacilityQtyChange = (facility, value) => {
    const qty = parseInt(value) || 0;
    setFormData({
      ...formData,
      facilities: {
        ...formData.facilities,
        [facility]: qty,
      },
    });
  };

  const handleTimeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, times: [...formData.times, value] });
    } else {
      setFormData({
        ...formData,
        times: formData.times.filter((t) => t !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookings([...bookings, formData]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      facilities: {},
      date: "",
      times: [],
    });
    alert("Booking submitted successfully!");
  };

  const totalAmount =
    Object.entries(formData.facilities).reduce((acc, [key, qty]) => {
      const item = facilities.find((f) => f.name === key);
      return acc + (item ? item.price * qty : 0);
    }, 0) * (formData.times.length || 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Xtraordinary Digital School Booking System
          </h1>
          <button
            onClick={() => setView(view === "form" ? "dashboard" : "form")}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200 font-medium"
          >
            {view === "form" ? "Dashboard" : "Back to Booking"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {view === "form" ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Section: Booking Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                Book Facilities
              </h2>

              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-2">Select Facilities & Quantity</label>
              <div className="mb-4 grid grid-cols-1 gap-2">
                {facilities.map((f) => (
                  <div
                    key={f.name}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <span>
                      {f.name} (max {f.count}) - ${f.price}/hr
                    </span>
                    <input
                      type="number"
                      min="0"
                      max={f.count}
                      value={formData.facilities[f.name] || 0}
                      onChange={(e) =>
                        handleFacilityQtyChange(f.name, e.target.value)
                      }
                      className="w-20 border rounded p-1"
                    />
                  </div>
                ))}
              </div>

              <label className="block mb-2">Select Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-2">Select Time Slots</label>
              <div className="mb-4 grid grid-cols-2 gap-2">
                {timeSlots.map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      value={t}
                      checked={formData.times.includes(t)}
                      onChange={handleTimeChange}
                    />
                    {t}
                  </label>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-4 shadow-inner">
                <p className="text-lg font-semibold">Total: ${totalAmount}</p>
                <div className="mt-2 flex items-center gap-4">
                  <img
                    src={"./qr.png"}
                    alt="QR Code"
                    className="border rounded"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <a
                    href="https://wa.me/+60146744662"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Send Proof via WhatsApp
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Submit Booking
              </button>
            </form>

            {/* Right Section: Info Panel */}
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                Why Book With Us?
              </h2>
              <p className="text-gray-700">
                ✅ You will support poor and disadvantaged student while
                playing.
              </p>
              <p className="text-gray-700 mb-2">
                ✅ Affordable prices with up to 30% discount compared to
                competitors.
              </p>
              <p className="text-gray-700 mb-2">
                ✅ Wide variety of sports facilities available every weekend.
              </p>
              <p className="text-gray-700 mb-2">
                ✅ Easy online payment and WhatsApp confirmation.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Booking Dashboard
            </h2>
            {bookings.length === 0 ? (
              <p className="text-gray-500">No bookings yet.</p>
            ) : (
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Phone</th>
                    <th className="p-2 border">Facilities</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Time Slots</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={i} className="text-center">
                      <td className="p-2 border">{b.name}</td>
                      <td className="p-2 border">{b.email}</td>
                      <td className="p-2 border">{b.phone}</td>
                      <td className="p-2 border">
                        {Object.entries(b.facilities)
                          .filter(([_, qty]) => qty > 0)
                          .map(([name, qty]) => `${name} x${qty}`)
                          .join(", ")}
                      </td>
                      <td className="p-2 border">{b.date}</td>
                      <td className="p-2 border">{b.times.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 mt-8 text-center">
        <p>
          © 2024 Xtraordinary Digital School Booking System. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
