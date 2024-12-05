import '@testing-library/jest-dom';
import { render, screen, type RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../src/components/layout/layout';

let baseComponent: RenderResult;

describe('Test Layout Component', () => {
  beforeEach(() => {
    baseComponent = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>,
    );
  });

  it('Should render the app-wrapper div', () => {
    const appWrapper = baseComponent.getByTestId('app-wrapper');

    expect(appWrapper).toHaveAttribute('id', 'app-wrapper');
  });

  it('Should render the header-wrapper', () => {
    const headerDiv = baseComponent.getByTestId('header-wrapper');

    expect(headerDiv).toBeInTheDocument();
  });

  it('Should render the main component', () => {
    const mainDiv = baseComponent.getByTestId('main-wrapper');
    expect(mainDiv).toContainElement(screen.getByTestId('home-wrapper'));
  });

  it('Should reder the footer div', () => {
    const footerDiv = baseComponent.getByTestId('footer-wrapper');
    expect(footerDiv).toContainElement(screen.getByTestId('privacy-policy-link'));
  });

  it('Should render the link to Privacy Policy', () => {
    const privacyPolicy = baseComponent.getByTestId('privacy-policy-link');
    expect(privacyPolicy).toHaveAttribute('href', '/privacy-policy');
  });
});
