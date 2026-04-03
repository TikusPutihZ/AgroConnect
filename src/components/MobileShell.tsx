import { ReactNode } from "react";
import BottomNav from "./BottomNav";

const MobileShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-muted">
      <div className="w-[390px] h-[844px] bg-background shadow-2xl shadow-foreground/5 flex flex-col relative overflow-hidden rounded-2xl">
        <main className="flex-1 overflow-y-auto pb-0 scrollbar-hide">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
};

export default MobileShell;
