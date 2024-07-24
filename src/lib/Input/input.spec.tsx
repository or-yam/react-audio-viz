import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Input } from './Input';

describe('Input', () => {
  it('renders input', () => {
    render(<Input type="text" />);

    screen.debug();
  });
});
