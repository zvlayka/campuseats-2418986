// src/hooks/useVendors.js
import { useEffect, useState } from "react";

export function useVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

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

  function reload() {
    setReloadKey((key) => key + 1);
  }

  return { vendors, loading, error, reload };
}