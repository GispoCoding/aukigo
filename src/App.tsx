import React, { useState, useEffect } from 'react';
import './App.css';
import MapComponent from './components/mapcomponent';
import getCapabilities from './services/aukigo';

interface Basemaps {
  WMTS: [],
  VectorTile: []
}

interface Tilesets {
  Tileset: []
}

interface Capabilities {
  basemaps: Basemaps,
  tilesets: Tilesets[],
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [capabilities, setCapabilities] = useState<Capabilities>();
  const [basemaps, setBasemaps] = useState<Basemaps>();
  const [tilesets, setTilesets] = useState<Tilesets[]>([]);

  useEffect(() => {
    getCapabilities()
      .then((response) => {
        setCapabilities(response);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      setBasemaps(capabilities!.basemaps);
      setTilesets(capabilities!.tilesets);
    }
  }, [loading, capabilities]);

  return (
    <div className="App">
      {(basemaps && <MapComponent props={basemaps} />) || 'loading'}
    </div>
  );
}

export default App;
