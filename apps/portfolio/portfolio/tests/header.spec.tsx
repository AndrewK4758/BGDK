import '@testing-library/jest-dom';
import { fireEvent, render, type RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../src/components/header/header';
import { Suspense } from 'react';

let baseComponent: RenderResult;

describe('Test Header component', () => {
  beforeEach(() => {
    baseComponent = render(
      <BrowserRouter>
        <Suspense>
          <Header />
        </Suspense>
      </BrowserRouter>,
    );
    const emailButton = baseComponent.getByTestId('email-icon');
    fireEvent.click(emailButton);
  });

  it('Should test the email dialog opening', () => {
    const emailDialog = baseComponent.getByTestId('email-dialog');
    expect(emailDialog).toBeInTheDocument();
  });

  it('Should test the 2 tabs in email dialog', () => {
    const tabs = baseComponent.getByTestId('contact-tabs');

    console.log(tabs);
    expect(tabs).toBeInTheDocument();
  });
});
