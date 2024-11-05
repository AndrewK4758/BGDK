import { render } from '@testing-library/react';
import Layout from '../src/components/layout/Layout';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('Test Home Component', () => {
  it('Should Pass', () => {
    const baseComponent = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>,
    );
    expect(baseComponent).toBeTruthy();
  });
});
