import { render } from '@testing-library/react';

import Home from './home';
import React from 'react';

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Home />);
    expect(baseElement).toBeTruthy();
  });
});
