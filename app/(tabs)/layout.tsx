import Header from '../_components/Header';
import TabBar from './_components/Tab';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <Header />
        <div>{children}</div>
        <TabBar />
      </div>
    </>
  );
}
