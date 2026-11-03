import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import Footer from "./components/Footer.jsx";
import { Loading, ErrorMessage } from "./components/Status.jsx";

function App() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("menu");

  // Fetch vendor data from public/api/vendors.json
  useEffect(() => {
    const controller = new AbortController();

    async function loadVendors() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/vendors.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        setVendors(data);

        setSelectedVendorId((currentId) => currentId ?? data[0]?.id ?? null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadVendors();

    return () => controller.abort();
  }, [reloadKey]);

  const selectedVendor = vendors.find(
    (vendor) => vendor.id === selectedVendorId,
  );

  // Add an item to the cart
  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id);

      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }

      return [...prevCart, { item, qty: 1 }];
    });
  }

  // Calculate total quantity for the header badge
  const cartCount = cart.reduce((total, line) => total + line.qty, 0);

  let content;

  if (loading) {
    content = <Loading />;
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((key) => key + 1)}
      />
    );
  } else if (vendors.length === 0) {
    content = <p>No vendors available.</p>;
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>

          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>

            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    );
  }

  return (
    <>
      <Header cartCount={cartCount} />

      <main className="container">{content}</main>

      <Footer />
    </>
  );
}

export default App;