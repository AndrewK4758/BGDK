import '@testing-library/jest-dom';
import { render, type RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../src/pages/home/home';
import { ABOUT_ME_TITLE } from '../src/components/intro/static/intro-text';

let baseComponent: RenderResult;

describe('Test Home Component', () => {
  beforeEach(() => {
    baseComponent = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
  });

  it('Should show intro h1 title', () => {
    const introTitle = baseComponent.getByTestId('about-me-title-text');

    expect(introTitle).toHaveTextContent(ABOUT_ME_TITLE);
  });

  it('Should show intro text', () => {
    const introTextData = baseComponent.getByTestId('about-me-text');
    const introTextLink = baseComponent.getByTestId('link-to-woodstock.dev');

    expect(introTextData).toHaveRole('paragraph');
    expect(introTextLink).toHaveRole('link');
    expect(introTextLink).toHaveTextContent('Woodstock Developers Group');
  });

  it('Shoud show Picture & Resume text and image data', () => {
    const resumePic = baseComponent.getByTestId('card-media-resume-image');
    const resumeButton = baseComponent.getByTestId('card-media-resume-button');

    expect(resumePic).toHaveAttribute('src', '/src/assets/self.webp');
    expect(resumePic).toHaveAttribute('alt', 'andrew');

    expect(resumeButton).toHaveTextContent('Resume');
    expect(resumeButton).toHaveAttribute('href', '/src/assets/Resume.pdf');
    expect(resumeButton).toHaveAttribute('download', `andrew-klapper-resume-${new Date().toLocaleDateString()}`);
  });
});
