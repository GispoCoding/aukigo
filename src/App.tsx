import React, { useState, useEffect } from 'react';
import './App.css';
import MapComponent from './components/mapcomponent';
import getCapabilities from './services/getcapabilities';
import { Capabilities, Basemaps, Tileset } from './types';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [capabilities, setCapabilities] = useState<Capabilities>();
  const [basemaps, setBasemaps] = useState<Basemaps>();
  const [tilesets, setTilesets] = useState<Tileset[]>([]);

  useEffect(() => {
    getCapabilities()
      .then((response) => {
        setCapabilities(response);
      });
  }, []);

  useEffect(() => {
    if (capabilities) {
      setBasemaps(capabilities!.basemaps);
      setTilesets(capabilities!.tilesets);
      setLoading(false);
    }
  }, [capabilities]);

  if (loading) { return <div>Loading...</div>; }
  return (
    <div className="App">
      <MapComponent basemaps={basemaps!} tilesets={tilesets!} />
    </div>
  );
}

export default App;
