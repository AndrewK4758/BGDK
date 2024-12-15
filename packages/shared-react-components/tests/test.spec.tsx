import { render } from '@testing-library/react';
import { Waiting } from '../src/lib/waiting/waiting';

describe('Test Waiting Component', () => {
  it('Should Pass', () => {
    const baseComponent = render(<Waiting />);
    expect(baseComponent).toBeTruthy();
  });
});
