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

  if (!basemaps) return <div data-testid="loading">Loading...</div>;
  return (
    <div className="App" data-testid="app">
      <MapComponent data-testid="map" props={basemaps} />
      {/* {(basemaps && <MapComponent data-testid="map" props={basemaps} />) || 'loading'} */}
    </div>
  );
}

export default App;
