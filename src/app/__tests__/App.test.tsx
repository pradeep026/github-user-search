import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('Test App', () => {
  it(`it renders`, () => {
    render(<App />);
  });
});
