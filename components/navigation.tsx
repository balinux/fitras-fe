"use client";

import { usePathname } from "next/navigation";
import NavButton from "@/components/nav-button";

type Route = {
  name: string;
  href: string;
};

export default function Navigation() {
  // path name
  const pathname = usePathname();

  // define route navigation
  const routes: Route[] = [
    { name: "Home", href: "/" },
    { name: "Overview", href: "/overview" },
    { name: "Transactions", href: "/transactions" },
    { name: "Account", href: "/account" },
    { name: "Category", href: "/category" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      <div className="flex items-center gap-x-6">
        {routes.map((route) => (
          <NavButton
            key={route.href}
            href={route.href}
            label={route.name}
            isActive={pathname === route.href}
          />
        ))}
      </div>
    </nav>
  );
}
