const baseUrl = process.env.REACT_APP_SERVER;

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

async function getCapabilities(): Promise<Capabilities> {
  const url = `${baseUrl}/api/capabilities`;
  const options = {
    headers: {
      Accept: 'application/json',
      redirect: 'follow',
    },
  };
  try {
    const request = await fetch(url, options);
    const data:Capabilities = await request.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

export default getCapabilities;
