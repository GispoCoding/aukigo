import React, { useState, useEffect } from 'react';
import './App.css';
import MapComponent from './components/mapcomponent';
import getCapabilities from './services/getcapabilities';

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
  const [tilesets, setTilesets] = useState<Tilesets[]>([]); // eslint-disable-line

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

  if (!basemaps) return <div>Loading...</div>;
  return (
    <div className="App">
      <MapComponent props={basemaps} />
    </div>
  );
}

export default App;
