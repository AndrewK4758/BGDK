import { render } from '@testing-library/react';
import Home from '../src/pages/home-page';

describe('Test Home Component', () => {
  it('Should Pass', () => {
    const baseComponent = render(<Home />);
    expect(baseComponent).toBeTruthy();
  });
});
