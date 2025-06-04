import Sidebar from "@/components/Sidebar";



export default function InnerLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const loggedIn = { firstName: "Nyasha Musanhu", lastName: "Musanhu"}
    return (
     <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn}/>
      { children }
     </main>
    );
  }