import { Link, NavLink } from "@remix-run/react";

export const Header = () => (
  <header className="container mx-auto flex items-center justify-between">
    <Link to="/" aria-label="Home">
      <img
        src="https://theahl.wpenginepowered.com/wp-content/uploads/sites/3/2022/03/AHL_Secondary22_100px.png"
        alt="ahl logo"
      />
    </Link>
    <nav className="flex gap-6">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/standings">Standings</NavLink>
    </nav>
  </header>
);
