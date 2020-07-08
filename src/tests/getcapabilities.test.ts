import fetch from 'jest-fetch-mock';
import getCapabilities from '../services/getcapabilities';
import testCapabilities from './data/getcapabilities';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('getcapabilities', () => {
  it('returns capabilities', async () => {
    fetch.once(JSON.stringify(testCapabilities));

    const capabilities = await getCapabilities();
    expect(capabilities).toEqual(testCapabilities);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
