import { Link, NavLink, useLoaderData } from "@remix-run/react";
import type { WithBootstrap } from "../types";

const linkClass =
  "text-lg transition-opacity hover:opacity-70 border-b-2 border-transparent hover:border-slate-900";
const activeLinkClass =
  "text-lg transition-opacity hover:opacity-70 border-b-2 border-slate-900";

const PlayoffsLink = () => {
  const { playoffsStarted } = useLoaderData<WithBootstrap<unknown>>();

  if (!playoffsStarted) {
    return;
  }

  return (
    <NavLink
      to="/playoffs"
      className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
    >
      Playoffs
    </NavLink>
  );
};

export const Header = () => (
  <header className="container mx-auto flex items-center justify-between">
    <Link to="/" aria-label="Home">
      <img
        src="https://theahl.wpenginepowered.com/wp-content/uploads/sites/3/2022/03/AHL_Secondary22_100px.png"
        alt="ahl logo"
      />
    </Link>
    <nav className="flex gap-6">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
      >
        Home
      </NavLink>
      <NavLink
        to="/standings"
        className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
      >
        Standings
      </NavLink>
      <PlayoffsLink />
    </nav>
  </header>
);
