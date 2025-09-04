import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import NavBar from "./NavBar";
import Logo from "./Logo";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <Logo isDark />
              <div className="mb-4 pt-3">
                <Link
                  to="/add-real-estate"
                  onClick={() => setOpen(false)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#111629] hover:bg-[#1e2955] rounded-lg transition-colors duration-200"
                >
                  Add Real Estate
                </Link>
              </div>
              {/* <div className="">
                <NavBar />
              </div> */}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
