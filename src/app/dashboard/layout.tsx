import { ReactNode } from "react";
import Dashboard from "../components/Dashboard";

async function  Layout({ children }: { children: ReactNode }) {
    return (
      <div className="w-full flex items-center justify-between h-screen">
        <Dashboard />
        {children}
      </div>
    );
  }
  
  export default Layout;