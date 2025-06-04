


export default function InnerLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <main className="flex h-screen w-full font-inter">
      SIDEBAR
      { children }
     </main>
    );
  }