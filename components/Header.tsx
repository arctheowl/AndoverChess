const Header = () => {
  return (
    <header className="bg-slate-100 fixed top-0 right-0 left-0 shadow-lg ">
      <nav className="p-4 flex items-center justify-around text-lg">
        <div>
          <a href="/">Andover Chess</a>
        </div>
        <div>
          <ul className="flex list-none m-0 p-0">
            <li style={{ marginLeft: "1rem" }}>
              <a href="/about">About</a>
            </li>
            <li style={{ marginLeft: "1rem" }}>
              <a href="/fixtures">Fixtures</a>
            </li>
            <li style={{ marginLeft: "1rem" }} className="hidden md:no-hidden">
              <a href="/articles">Articles</a>
            </li>
            <li style={{ marginLeft: "1rem" }} className="hidden">
              <a href="/tools">Tools</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
