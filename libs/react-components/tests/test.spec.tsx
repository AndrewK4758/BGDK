import { render } from '@testing-library/react';
import Login from '../src/lib/games-ui/login/login';

describe('Test Footer', () => {
  it('Should Pass', () => {
    const baseComponent = render(
      <Login
        toggleDrawer={() => () => {
          return 0;
        }}
        anchor={'right'}
      />,
    );
    expect(baseComponent).toBeTruthy();
  });
});
