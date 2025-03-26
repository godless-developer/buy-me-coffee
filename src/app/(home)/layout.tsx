import HomeSideBar from "./_components/HomeSideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <HomeSideBar />
      {children}
    </div>
  );
}
