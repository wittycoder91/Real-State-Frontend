import Logo from "./Logo";
import { MobileSidebar } from "./MobileNavbar";
import { Link } from "react-router-dom";
// import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-50 border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo isDark />
        <div className="flex items-center gap-4">
          <Link
            to="/add-real-estate"
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#111629] hover:bg-[#1e2955] rounded-lg transition-colors duration-200"
          >
            Add Real Estate
          </Link>
          <div className="block sm:hidden">
            <MobileSidebar />
          </div>
        </div>
        {/* <div className="hidden sm:block">
          <NavBar />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
