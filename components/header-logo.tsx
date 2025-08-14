import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href="/">
      <div className="item-center hidden lg:flex">
        <Image src="/logo2.svg" alt="Logo" width={28} height={28} />
        <span className="font-semibold text-white text-3xl ml-2.5">Fitras</span>
      </div>
    </Link>
  );
}
