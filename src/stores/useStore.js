import React from 'react';
import api from '../service/api'

const useStore = (() => {
  const state = {
    countries: [],
    ports: [],
    products: [],
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

  const notify = () => {
    listeners.forEach(listener => listener());
  };

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
      const response = await fetch(`${api}/negaras`);
      if (!response.ok) throw new Error('Failed to fetch countries');
      const data = await response.json();
      setState({ countries: data, loading: { ...state.loading, countries: false } });
    } catch (error) {
      setState({
        error: 'Gagal memuat data negara. Periksa koneksi internet Anda.',
        loading: { ...state.loading, countries: false }
      });
    }
  };

  const fetchPorts = async (countryId) => {
    try {
      setState({ loading: { ...state.loading, ports: true }, error: null });
      const response = await fetch(`${api}/pelabuhans/${countryId}`);
      if (!response.ok) throw new Error('Failed to fetch ports');
      const data = await response.json();
      const ports = Array.isArray(data) ? data : [data];
  
      setState({
        ports: ports,
        loading: { ...state.loading, ports: false }
      });
  
      if (ports.length === 1) {
        const autoPortId = ports[0].id_pelabuhan.toString();
        setState({
          selectedPort: autoPortId,
          step: 2
        });
        await fetchProducts(autoPortId);
      } else {
        setState({ step: 2 }); 
      }
    } catch (error) {
      setState({
        error: 'Gagal memuat data pelabuhan.',
        loading: { ...state.loading, ports: false }
      });
    }
  };
  
  

  const fetchProducts = async (portId) => {
    try {
      setState({ loading: { ...state.loading, products: true }, error: null });
      const response = await fetch(`${api}/barangs/${portId}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      const products = Array.isArray(data) ? data : [data];
  
      setState({
        products: products,
        loading: { ...state.loading, products: false }
      });
  
      if (products.length === 1) {
        const product = products[0];
        const total = product.harga * (1 - product.diskon / 100);
  
        setState({
          selectedProduct: product.id_barang.toString(),
          discount: product.diskon,
          price: product.harga,
          total: total,
          productDescription: product.description,
          step: 4
        });
      } else {
        setState({ step: 3 });
      }
    } catch (error) {
      setState({
        error: 'Gagal memuat data barang.',
        loading: { ...state.loading, products: false }
      });
    }
  };
  

  const selectCountry = (countryId) => {
    setState({
      selectedCountry: countryId,
      selectedPort: '',
      selectedProduct: '',
      ports: [],
      products: [],
      discount: 0,
      price: 0,
      total: 0,
      productDescription: '',
      step: 1
    });
    if (countryId) {
      fetchPorts(countryId);
    }
  };

  const selectPort = (portId) => {
    setState({
      selectedPort: portId,
      selectedProduct: '',
      products: [],
      discount: 0,
      price: 0,
      total: 0,
      productDescription: '',
      step: 2
    });
    if (portId) {
      fetchProducts(portId);
    }
  };

  const selectProduct = (productId) => {
    const product = state.products.find(p => p.id_barang === parseInt(productId));
    if (product) {
      const total = product.harga * (1 - product.diskon / 100);
      setState({
        selectedProduct: productId,
        discount: product.diskon,
        price: product.harga,
        total: total,
        productDescription: product.description,
        step: 4
      });
    }
  };

  const resetForm = () => {
    setState({
      selectedCountry: '',
      selectedPort: '',
      selectedProduct: '',
      ports: [],
      products: [],
      discount: 0,
      price: 0,
      total: 0,
      productDescription: '',
      step: 1,
      error: null
    });
  };
  useStore.actions = {
    fetchCountries,
    selectCountry,
    selectPort,
    selectProduct,
    resetForm
  };

  return useStore;
})();

export default useStore;
