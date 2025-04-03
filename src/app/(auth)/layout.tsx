import { Toaster } from "@/components/ui/sonner";
import { AuthSideBar } from "./_AUTHcomponents/AuthSideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <AuthSideBar />
      {children}
      <Toaster />
    </div>
  );
}
