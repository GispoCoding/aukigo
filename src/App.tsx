import React, {
  useCallback, useEffect, useState,
} from 'react';
import './App.css';
import MapComponent from './components/mapcomponent';
import MainUI from './components/mainui';
import getCapabilities from './services/getcapabilities';
import { Basemaps, Capabilities, Tileset } from './types';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [capabilities, setCapabilities] = useState<Capabilities>();
  const [basemaps, setBasemaps] = useState<Basemaps>();
  const [basemapIdx, setBasemapIdx] = useState(0);
  const [tilesets, setTilesets] = useState<Tileset[]>([]);
  const [selectedLayerName, setSelectedLayerName] = useState<string>('');

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
    }
  }, [capabilities]);

  // Unset loading when ready
  useEffect(() => {
    if (basemaps && tilesets) {
      setLoading(false);
    }
  }, [basemaps, tilesets]);

  // Toggle vector layers
  const onToggleLayer = useCallback((layerName: string) => {
    const layerActive = tilesets.map((tileset) => tileset.name).includes(layerName);
    if (layerActive) {
      setTilesets([...tilesets
        .filter((tileset) => tileset.name !== layerName)]);
    } else {
      setTilesets(capabilities!.tilesets.filter((tileset: Tileset) => tileset.name === layerName));
    }
    setSelectedLayerName(layerName);
  }, [capabilities, tilesets]);

  // Toggle basemaps TODO: fix to be better
  const onToggleBasemap = useCallback(() => {
    const wmts = capabilities!.basemaps.WMTS;
    const vectorTiles = capabilities!.basemaps.vectorTile;
    const basemapCount: number = wmts.length + vectorTiles.length - 1;
    const newBasemapIdx: number = basemapIdx < basemapCount ? basemapIdx + 1 : 0;
    const newBasemaps: Basemaps = {
      WMTS: newBasemapIdx < wmts.length ? [wmts[newBasemapIdx]] : [],
      vectorTile: newBasemapIdx > wmts.length ? [vectorTiles[newBasemapIdx]] : [],
    };
    setBasemapIdx(newBasemapIdx);
    setBasemaps(newBasemaps);
    // eslint-disable-next-line
  }, [capabilities, basemaps]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <MainUI onToggleLayer={onToggleLayer} onToggleBasemap={onToggleBasemap} />
      <MapComponent
        basemaps={basemaps!}
        tilesets={tilesets!}
        selectedLayerName={selectedLayerName}
      />
    </div>
  );
}

export default App;
