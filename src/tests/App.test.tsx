import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import App from '../App';

jest.mock('../services/getcapabilities');
afterEach(cleanup);

describe('App', () => {
  test('app shows loading div', async () => {
    const { getByText } = render(<App />);
    await waitForElement(() => getByText('Loading...'));
  });
});
