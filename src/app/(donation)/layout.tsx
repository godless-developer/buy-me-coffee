import DonHeader from "./_components/DonHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <DonHeader />
      {children}
    </div>
  );
}
