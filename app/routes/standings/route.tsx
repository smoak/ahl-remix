import { Layout } from "~/components/Layout";
import { NavLink, Outlet, json } from "@remix-run/react";
import { getBootstrap } from "~/api";
import type { LoaderFunction } from "@remix-run/node";
import { normalizeBootstrap } from "~/data/normalization/bootstrap";

const baseNavLinkClassNames =
  "inline-block rounded-md border-b-2 p-4 hover:text-ahl-blue-100 hover:border-ahl-blue-100 hover:bg-slate-700";
const inactiveNavLinkClassNames = `${baseNavLinkClassNames} border-transparent`;
const activeNavLinkClassNames = `${baseNavLinkClassNames} text-ahl-blue-100 border-ahl-blue-100 bg-slate-900`;

export const loader: LoaderFunction = async () => {
  const bootstrap = await getBootstrap();
  const normalizedBootstrap = normalizeBootstrap(bootstrap);

  return json({ ...normalizedBootstrap });
};

const Index = () => {
  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Standings</h1>
      <div className="mb-3 rounded-t-md border-b border-ahl-blue-900 p-1 text-center text-sm font-medium text-ahl-blue-900">
        <ul className="-mb-px flex flex-wrap">
          <li className="me-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? activeNavLinkClassNames : inactiveNavLinkClassNames
              }
              to="/standings"
              end={true}
            >
              Division
            </NavLink>
          </li>
          <li className="me-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? activeNavLinkClassNames : inactiveNavLinkClassNames
              }
              to="/standings/conference"
            >
              Conference
            </NavLink>
          </li>
          <li className="me-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? activeNavLinkClassNames : inactiveNavLinkClassNames
              }
              to="/standings/league"
            >
              League
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </Layout>
  );
};

export default Index;
