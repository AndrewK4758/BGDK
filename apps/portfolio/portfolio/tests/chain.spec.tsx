import { render } from '@testing-library/react';
import Chain from '../src/components/code/chain'
import { describe, expect, it } from 'vitest';

describe('Test Chain', () => {
  it('Should Pass', () => {
    const baseComponent = render(<Chain/>)
    expect(baseComponent).toBeTruthy()
  })
})
