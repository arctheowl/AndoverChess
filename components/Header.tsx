import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="bg-slate-100 fixed top-0 right-0 left-0 shadow-lg max-h-16">
      <nav className="p-4 flex md:justify-around text-lg">
        <MobileMenu />
        <div className="absolute md:relative md:mb-24 pl-24 md:pl-0">
          <a href="/">Andover Chess</a>
        </div>
        <DesktopHeader />
      </nav>
    </header>
  );
};

export default Header;

const DesktopHeader = () => {
  return (
    <div className="hidden md:flex">
      <ul className="flex list-none m-0 p-0">
        <li style={{ marginLeft: "1rem" }}>
          <a href="/about">About</a>
        </li>
        <li style={{ marginLeft: "1rem" }}>
          <a href="/fixtures">Fixtures</a>
        </li>
        <li style={{ marginLeft: "1rem" }} className="hidden md:flex">
          <a href="/articles">Articles</a>
        </li>
        <li style={{ marginLeft: "1rem" }} className="hidden md:flex">
          <a href="/tools">Tools</a>
        </li>
      </ul>
    </div>
  );
};
