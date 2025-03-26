import HeaderE from "./_USERcomponents/HeaderE";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen">
      <HeaderE />
      {children}
    </div>
  );
}
