import { render } from '@testing-library/react';
import Text from '../../shared-react-components/src/lib/text/text';

describe('Test Text', () => {
  it('Should Pass', () => {
    const baseComponent = render(
      <Text titleVariant={'h1'} titleText={'TEXT TITLE'} id="TEXT TITLE" sx={{ color: 'red' }} />,
    );

    expect(baseComponent.getByText('TEXT TITLE')).toBeTruthy();
  });
});
