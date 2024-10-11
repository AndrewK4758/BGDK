import { render } from '@testing-library/react';

import Label from '../lib/label/label';

describe('Label', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Label labelText={''} sx={null} labelVariant={'h1'} />);
    expect(baseElement).toBeTruthy();
  });
});
