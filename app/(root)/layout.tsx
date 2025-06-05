import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";



export default function InnerLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const loggedIn = { firstName: "Nyasha Musanhu", lastName: "Musanhu"}
    return (
     <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn}/>
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image alt="menu-icon" src="/icons/logo.svg" width={30} height={30}/>
          <div>
            <MobileNav user={loggedIn}/>
          </div>

        </div>
        { children }
      </div>
      
     </main>
    );
  }