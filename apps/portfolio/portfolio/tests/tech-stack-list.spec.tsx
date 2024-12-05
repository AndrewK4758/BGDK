import '@testing-library/jest-dom';
import { render, type RenderResult } from '@testing-library/react';
import TechStackList, {
  analytics,
  build,
  cloud,
  data,
  languages,
  libraries,
  styles,
  testing,
} from '../src/components/tech-list/tech-list';

let baseComponent: RenderResult;

describe('Test the TechStackList component', () => {
  beforeEach(() => {
    baseComponent = render(<TechStackList />);
  });

  it('should render tech stack lists correctly', () => {
    const allItems = [languages, libraries, styles, data, cloud, build, analytics, testing];
    allItems.forEach(list => {
      list.forEach(e => {
        const item = baseComponent.getByText(e);
        const itemSvg = baseComponent.getByTestId(`${e}-svg-icon`);

        expect(item).toBeInTheDocument();
        expect(itemSvg).toBeInTheDocument();
      });
    });
  });
});
