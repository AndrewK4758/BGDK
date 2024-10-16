import { render } from '@testing-library/react';

import TechStackList from '../components/tech-list/tech-list';

describe('Tech List', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TechStackList />);
    expect(baseElement).toBeTruthy();
  });
});
