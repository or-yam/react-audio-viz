import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  it('renders button', () => {
    render(<Button type="button" />);

    screen.debug();
  });
});
