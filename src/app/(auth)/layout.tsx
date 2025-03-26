import { AuthSideBar } from "./_AUTHcomponents/AuthSideBar";
import SignUp from "./signup/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <AuthSideBar />
      {children}
    </div>
  );
}
