// ✅ useStore.js (updated)
import React from 'react';
import api from '../service/api';

const useStore = (() => {
  const state = {
    countries: [],
    ports: [],
    products: {}, 
    selectedCountry: '',
    selectedPort: '',
    selectedProduct: '',
    discount: 0,
    price: 0,
    total: 0,
    productDescription: '',
    loading: {
      countries: false,
      ports: false,
      products: false
    },
    error: null,
    step: 1
  };

  const listeners = new Set();
  const notify = () => listeners.forEach(listener => listener());
  const setState = (newState) => {
    Object.assign(state, newState);
    notify();
  };

  const useStore = (selector) => {
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    React.useEffect(() => {
      listeners.add(forceUpdate);
      return () => listeners.delete(forceUpdate);
    }, []);
    return selector ? selector(state) : state;
  };

  const fetchCountries = async () => {
    try {
      setState({ loading: { ...state.loading, countries: true }, error: null });
      const res = await fetch(`${api}/negaras`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setState({ countries: data, loading: { ...state.loading, countries: false } });
    } catch {
      setState({ error: 'Gagal memuat data negara.', loading: { ...state.loading, countries: false } });
    }
  };

  const fetchPorts = async (countryId) => {
    try {
      setState({ loading: { ...state.loading, ports: true }, error: null });
      const filter = {
        where: { id_negara: parseInt(countryId) },
        fields: { id_pelabuhan: true, nama_pelabuhan: true, id_negara: true }
      };
      const res = await fetch(`${api}/pelabuhans?filter=${JSON.stringify(filter)}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      const ports = Array.isArray(data) ? data : [data];
      setState({ ports, loading: { ...state.loading, ports: false } });
      if (ports.length === 1) {
        const autoPortId = ports[0].id_pelabuhan.toString();
        setState({ selectedPort: autoPortId, step: 2 });
        await fetchProducts(autoPortId);
      } else {
        setState({ step: 2 });
      }
    } catch {
      setState({ error: 'Gagal memuat data pelabuhan.', loading: { ...state.loading, ports: false } });
    }
  };

  const fetchProducts = async (portId) => {
    if (state.products[portId]) {
      setState({ step: 3 });
      return;
    }
    try {
      setState({ loading: { ...state.loading, products: true }, error: null });
      const filter = {
        where: { id_pelabuhan: parseInt(portId) },
        fields: { id_barang: true, nama_barang: true, harga: true, diskon: true, description: true, id_pelabuhan: true }
      };
      const res = await fetch(`${api}/barangs?filter=${JSON.stringify(filter)}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      const products = Array.isArray(data) ? data : [data];
      const newCache = { ...state.products, [portId]: products };
      setState({ products: newCache, loading: { ...state.loading, products: false } });
      if (products.length === 1) {
        const p = products[0];
        const total = p.harga * (1 - p.diskon / 100);
        setState({ selectedProduct: p.id_barang.toString(), discount: p.diskon, price: p.harga, total, productDescription: p.description, step: 4 });
      } else {
        setState({ step: 3 });
      }
    } catch {
      setState({ error: 'Gagal memuat data barang.', loading: { ...state.loading, products: false } });
    }
  };

  const fetchProductDetailById = async (id_barang) => {
    try {
      setState({ loading: { ...state.loading, products: true }, error: null });
  
      const filter = {
        where: { id_barang: parseInt(id_barang) },
        fields: {
          id_barang: true,
          nama_barang: true,
          harga: true,
          diskon: true,
          description: true,
          id_pelabuhan: true
        }
      };
  
      const res = await fetch(`${api}/barangs?filter=${JSON.stringify(filter)}`);
      if (!res.ok) throw new Error();
  
      const data = await res.json();
      const product = Array.isArray(data) ? data[0] : data;
  
      if (product) {
        const total = product.harga * (1 - product.diskon / 100);
        setState({
          selectedProduct: product.id_barang.toString(),
          discount: product.diskon,
          price: product.harga,
          total,
          productDescription: product.description,
          step: 4
        });
      }
  
      setState({ loading: { ...state.loading, products: false } });
    } catch {
      setState({
        error: 'Gagal memuat detail barang.',
        loading: { ...state.loading, products: false }
      });
    }
  };
  
  const selectCountry = (id) => {
    setState({ selectedCountry: id, selectedPort: '', selectedProduct: '', ports: [], discount: 0, price: 0, total: 0, productDescription: '', step: 1 });
    if (id) fetchPorts(id);
  };

  const selectPort = (id) => {
    setState({ selectedPort: id, selectedProduct: '', discount: 0, price: 0, total: 0, productDescription: '', step: 2 });
    if (id) fetchProducts(id);
  };

  const selectProduct = (id) => {
    const p = state.products[state.selectedPort]?.find(p => p.id_barang === parseInt(id));
    if (p) {
      const total = p.harga * (1 - p.diskon / 100);
      setState({ selectedProduct: id, discount: p.diskon, price: p.harga, total, productDescription: p.description, step: 4 });
    }
  };

  const resetForm = () => {
    setState({ selectedCountry: '', selectedPort: '', selectedProduct: '', ports: [], products: {}, discount: 0, price: 0, total: 0, productDescription: '', step: 1, error: null });
  };

  useStore.actions = { fetchCountries, selectCountry, selectPort, selectProduct, fetchProductDetailById, resetForm };
  return useStore;
})();

export default useStore;
