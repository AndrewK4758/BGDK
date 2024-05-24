import { Footer, Header, Main } from '@aklapper/react-components';

export default function Layout() {
  return (
    <>
      <Header component={'header'} titleText={'Games App'} headerTextVariant={'h2'} />
      <Main component={'main'} maxWidth={false} />
      <Footer />
    </>
  );
}
