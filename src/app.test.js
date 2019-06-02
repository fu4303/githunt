import ReactGA from 'react-ga';
import React from 'react';
import App from './app';

import {
  render,
  // fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react'
import 'jest-dom/extend-expect'

afterEach(cleanup)

test('Render default trending repo list', async () => {
  ReactGA.initialize('foo', { testMode: true });
  const {getAllByText} = render(<App />);
  const bbms = await waitForElement(() => getAllByText('Built by'));
  expect(bbms.length).toBeGreaterThan(10);
});
