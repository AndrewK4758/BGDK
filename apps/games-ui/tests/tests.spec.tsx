import { render } from '@testing-library/react';
import Home from '../src/pages/home-page';
import { describe, expect, it } from 'vitest';

describe('Test Home Component', () => {
  it('Should Pass', () => {
    const baseComponent = render(<Home />);
    expect(baseComponent).toBeTruthy();
  });
});
