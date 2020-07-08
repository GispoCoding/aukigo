import testCapabilities from '../../tests/data/getcapabilities';

function getCapabilities() {
  return Promise.resolve(JSON.stringify(testCapabilities));
}

export default getCapabilities;
