import { Coffee } from "lucide-react";
import Link from "next/link";

export default function HeaderE() {
  return (
    <div className="w-screen h-[80px] bg-white px-20 flex text-black justify-between items-center">
      <div className="w-full flex h-[100px] items-center gap-3">
        <Coffee size={20} strokeWidth={2.5} />
        <p className="text-[15px] font-bold">Buy Me Coffee</p>
      </div>
      <Link
        href={"./login"}
        className="bg-[#f4f4f5] h-10 text-black px-5 w-24 rounded-md flex justify-center items-center"
      >
        Log in
      </Link>
    </div>
  );
}
