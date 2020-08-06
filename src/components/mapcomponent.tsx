import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import {
  Map, MapBrowserEvent, Overlay, View,
} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource, { Options as VectorTileOptions } from 'ol/source/VectorTile';
import OLWMTS, { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import { transform } from 'ol/proj';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import MVT from 'ol/format/MVT';

import OverlayPositioning from 'ol/OverlayPositioning';
import { Basemaps, GeometryType, Tileset } from '../types';

interface MapProps {
  basemaps: Basemaps,
  tilesets: Tileset[]
}

const mapStyles = {
  polyStyle: new Style({
    stroke: new Stroke({
      color: 'orange',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(20,20,20,0.9',
    }),
  }),
  lineStyle: new Style({
    stroke: new Stroke({
      color: '#d900ff',
      width: 2,
    }),
  }),
  pointStyle: new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: '#666666',
      }),
      stroke: new Stroke({
        color: '#ffffff',
        width: 1,
      }),
    }),
  }),
};

const createVectorTileSource = (tileset: Tileset, layerIndex: number): VectorTileSource => {
  const options: VectorTileOptions = {
    attributions: tileset.attribution,
    format: new MVT(),
    maxZoom: tileset.maxzoom,
    minZoom: tileset.minzoom,
    url: tileset.tiles[layerIndex],
  };
  return new VectorTileSource(options);
};

interface FeatureProperties {
  [key: string]: any,
}

const popupContentFromFeatureProperties = (properties: FeatureProperties) => {
  const title = properties.name_fi ? properties.name_fi : properties.name;
  const website = properties.website ? properties.website : '';
  let resultHTML = `<h1>${title}</h1><a href=${website}>${website}</a><table>`;
  Object.keys(properties).forEach((key) => {
    resultHTML += `<tr><td>${key}<td><td>${properties[key]}</td><tr />`;
  });
  resultHTML += '</table>';
  return resultHTML;
};

function MapComponent({ basemaps, tilesets }: MapProps) {
  const [olMap, setOlMap] = useState<Map>();
  const WMTSLayers = basemaps.WMTS;
  // eslint-disable-next-line
  const [activeTileLayer, setActiveTileLayer] = useState<Tileset>();
  const mapContainerStyle = { height: '100%', width: '100%' };
  const [popup, setPopup] = useState<Overlay>();

  const mapRef = useRef(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Create Map
  useEffect(() => {
    setOlMap(new Map({
      target: undefined,
      controls: [],
      view: new View({
        center: [2478699.953232, 8501593.815476],
        zoom: 14,
      }),
    }));
  }, []);

  // Set olMap target and create popup Overlay
  useEffect(() => {
    if (olMap) {
      olMap?.setTarget(mapRef.current!);
      setPopup(new Overlay({
        element: popupRef.current!,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
        positioning: OverlayPositioning.CENTER_CENTER,
      }));
    }
    return () => olMap?.setTarget(undefined);
  }, [olMap]);

  // Add popup Overlay to map
  useEffect(() => {
    if (!olMap || !popup) return;
    if (!olMap.getOverlays().getLength()) olMap.addOverlay(popup);
  }, [olMap, popup]);

  // Create map click event listener
  useEffect(() => {
    if (!olMap || !popup) return;
    olMap.on('click', (evt: MapBrowserEvent) => {
      if (popupRef.current === null) return;
      const features = olMap.getFeaturesAtPixel(evt.pixel);
      if (features.length === 0) {
        popupRef.current.hidden = true;
        return;
      }
      popup.setPosition(evt.coordinate);
      popupRef.current.hidden = false;
      const properties = features[0].getProperties();
      popupRef.current.innerHTML = popupContentFromFeatureProperties(properties);
    });
  }, [olMap, popup]);

  // Set initial WMTS basemap and VectorTileLayer
  useEffect(() => {
    if (!olMap) return;

    // Clear layers
    const layers = [...olMap.getLayers().getArray()];
    layers.forEach((layer) => olMap.removeLayer(layer));

    const baseLayer = WMTSLayers[0];
    const parser = new WMTSCapabilities();
    fetch(baseLayer.url)
      .then((response) => response.text())
      .then((text) => {
        const result = parser.read(text);
        const options = optionsFromCapabilities(result, {
          layer: baseLayer.layer,
          matrixSet: baseLayer.tile_matrix_set,
        });
        olMap.addLayer(new TileLayer({
          source: new OLWMTS(options),
          zIndex: -1,
        }));
      });

    const defaultLayer = tilesets[0];
    setActiveTileLayer(defaultLayer);

    // Add layers
    defaultLayer.vector_layers.forEach((layerName, layerIndex) => {
      const vectorTileSource = createVectorTileSource(defaultLayer, layerIndex);

      const ending: string = `_${layerName.split('_').slice(-1)[0]}`;

      let style: Style = mapStyles.pointStyle;
      if (ending === GeometryType.Polygon) {
        style = mapStyles.polyStyle;
      } else if (ending === GeometryType.Line) {
        style = mapStyles.lineStyle;
      }

      const vectorLayer = new VectorTileLayer({
        source: vectorTileSource,
        style,
      });
      olMap.addLayer(vectorLayer);
    });

    const layerCenter = transform(
      [defaultLayer.center[0], defaultLayer.center[1]],
      'EPSG:4326', 'EPSG:3857',
    );
    const updatedView = new View({
      center: layerCenter,
      zoom: defaultLayer.center[2],
    });
    olMap.setView(updatedView);
  }, [olMap, WMTSLayers, tilesets]);

  return (
    <div style={mapContainerStyle}>
      <div style={mapContainerStyle} ref={mapRef} />
      <div
        ref={popupRef}
        style={{
          border: '1px solid black', backgroundColor: '#FFF',
        }}
      />
    </div>
  );
}

export default MapComponent;
