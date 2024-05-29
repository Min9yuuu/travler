import Header from '../_components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col mx-auto min-h-screen px-3 bg-gray-100">
        <Header />
        {children}
      </div>
    </>
  );
}
