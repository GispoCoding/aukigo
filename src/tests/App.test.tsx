import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import App from '../App';
import getCapabilities from '../services/getcapabilities';
import testCapabilities from './data/getcapabilities';

jest.mock('../services/getcapabilities');
jest.mock('../components/mapcomponent');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('App', () => {
  it('shows loading text', async () => {
    const mockGetCapabilities = getCapabilities as jest.Mock;
    mockGetCapabilities.mockResolvedValueOnce(JSON.stringify(testCapabilities));

    const { getByText } = render(<App />);
    await waitFor(() => getByText('Loading...'));
  });

  it('calls getCapabilities', async () => {
    const mockGetCapabilities = getCapabilities as jest.Mock;
    mockGetCapabilities.mockResolvedValueOnce(JSON.stringify(testCapabilities));

    render(<App />);
    await waitFor(() => expect(mockGetCapabilities).toHaveBeenCalledTimes(1));
  });
});
