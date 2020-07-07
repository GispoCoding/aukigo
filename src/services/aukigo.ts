const baseUrl = process.env.REACT_APP_SERVER;

const getCapabilities = () => {
  const url = `${baseUrl}/api/capabilities`;
  const options = {
    headers: {
      Accept: 'application/json',
      redirect: 'follow',
    },
  };
  const request = fetch(url, options);
  return request.then((response) => response.json());
};

export default getCapabilities;
