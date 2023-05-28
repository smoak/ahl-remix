import type { ReactNode } from "react";

export const TableCell = ({ children }: { children: ReactNode }) => {
  return <td className="border border-black px-3 py-2">{children}</td>;
};
