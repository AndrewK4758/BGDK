import { render } from '@testing-library/react';

import Label from '../lib/label/label.tsx';

describe('Label', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Label labelText={''} sx={null} labelVariant={'h1'} />);
    expect(baseElement).toBeTruthy();
  });
});
