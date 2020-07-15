import { Capabilities } from '../types';

const baseUrl = process.env.REACT_APP_SERVER;

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
