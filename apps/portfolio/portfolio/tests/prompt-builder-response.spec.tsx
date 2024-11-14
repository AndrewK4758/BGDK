import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PromptBuilderResponse from '../src/components/gen-ai/prompt-builder/prompt-builder-response';

describe('PromptBuilderResponse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PromptBuilderResponse prompt={''} />);
    expect(baseElement).toBeTruthy();
  });
});
