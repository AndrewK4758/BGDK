import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import App from '../src/app/app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(baseElement).toBeTruthy();
  });
});
