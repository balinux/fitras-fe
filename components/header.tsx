import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import HeaderLogo from "./header-logo";
import Navigation from "./navigation";
import { Skeleton } from "./ui/skeleton";
import WelcomeMessage from "./welcome-message";
import Filters from "./filters";
import { Suspense } from "react";

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Skeleton className="w-8 h-8 rounded-full" />
          </ClerkLoading>
        </div>
        <WelcomeMessage />
        <Suspense fallback={<FiltersLoading />}>
          <Filters />
        </Suspense>
      </div>
    </header>
  );
}

const FiltersLoading = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
      <Skeleton className="lg:w-[120px] w-full h-9 rounded-md" />
      <Skeleton className="lg:w-[120px] w-full h-9 rounded-md" />
    </div>
  );
};
