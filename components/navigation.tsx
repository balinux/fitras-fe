"use client";

import { usePathname, useRouter } from "next/navigation";
import NavButton from "@/components/nav-button";
import { useState } from "react";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

type Route = {
  name: string;
  href: string;
};

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // add route
  const router = useRouter();
  // path name
  const pathname = usePathname();

  // handle mobile menu
  const isMobile = useMedia("(max-width: 1024px)", false);

  // handler mobile menu
  const onClick = (href: string) => {
    router.push(href);
    setIsMobileMenuOpen(false);
  };

  // define route navigation
  const routes: Route[] = [
    { name: "Home", href: "/" },
    // { name: "Overview", href: "/overview" },
    { name: "Transactions", href: "/transactions" },
    { name: "Accounts", href: "/accounts" },
    { name: "Category", href: "/categories" },
    // { name: "Settings", href: "/settings" },
  ];

  // check if mobile
  if (isMobile) {
    return (
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? "secondary" : "ghost"}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.name}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

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
