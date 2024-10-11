import { render } from '@testing-library/react';

import TabLabel from '../lib/tab-label/tab-label';

describe('TabLabel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TabLabel mainVariant={'h1'} subVariant={'h1'} mainText={''} subText={''} />);
    expect(baseElement).toBeTruthy();
  });
});
