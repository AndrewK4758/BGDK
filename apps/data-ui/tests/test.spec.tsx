import { render } from '@testing-library/react';
import HomePage from '../src/pages/home-page';

describe('HomePage', () => {
  it('Should Pass', () => {
    const baseComponent = render(<HomePage />);

    expect(baseComponent).toBeTruthy();
  });
});
