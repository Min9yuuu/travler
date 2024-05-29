export default function PostLayout({ children, searchModal }: { children: React.ReactNode; searchModal: React.ReactNode }) {
  return (
    <>
      {children}
      {searchModal}
    </>
  );
}
