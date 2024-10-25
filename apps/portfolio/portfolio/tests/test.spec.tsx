import { render } from '@testing-library/react';
import Header from '../src/components/header/header';

describe('Test Home Component', () => {
  it('Should Pass', () => {
    const baseComponent = render(<Header />);
    console.log(baseComponent);
    expect(baseComponent).toBeTruthy();
  });
});
