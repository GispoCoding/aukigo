import React, { useState, useEffect } from 'react';
import './App.css';
import MapComponent from './components/mapcomponent';
import MainUI from './components/mainui';
import getCapabilities from './services/getcapabilities';
import { Capabilities, Basemaps, Tileset } from './types';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [capabilities, setCapabilities] = useState<Capabilities>();
  const [basemaps, setBasemaps] = useState<Basemaps>();
  const [tilesets, setTilesets] = useState<Tileset[]>([]);

  // Get capabilities document from backend
  useEffect(() => {
    getCapabilities()
      .then((response) => {
        setCapabilities(response);
      });
  }, []);

  // Set basemaps and tilesets
  useEffect(() => {
    if (capabilities) {
      setBasemaps(capabilities!.basemaps);
      setTilesets(capabilities!.tilesets);
    }
  }, [capabilities]);

  // Unset loading when ready
  useEffect(() => {
    if (basemaps && tilesets) { setLoading(false); }
  }, [basemaps, tilesets]);

  if (loading) { return <div>Loading...</div>; }
  return (
    <div className="App">
      <MainUI />
      <MapComponent basemaps={basemaps!} tilesets={tilesets!} />
    </div>
  );
}

export default App;
