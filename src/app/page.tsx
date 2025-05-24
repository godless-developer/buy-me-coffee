import Link from "next/link";

export default function HomeLogin() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: "url('/coffeebg.png')",
        backgroundSize: "cover",
        backdropFilter: "blur(5px)",
        backgroundPosition: "center",
      }}
    >
      <div className="w-[600px] flex-col justify-center items-center h-[300px] bg-white rounded-lg shadow-lg flex text-center  p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to Buy Me Coffee</h1>
        <p className="text-lg mb-8">Please log in to continue.</p>
        <Link
          href={"./login"}
          className=" bg-blue-600 text-white text-center  w-full py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
