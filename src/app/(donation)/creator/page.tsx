import CoverImage from "../_components/CoverImage";
import ProfileAbout from "../_components/ProfileAbout";
import SupportCoffee from "../_components/SupportCoffee";

export default function Creator() {
  return (
    <div className="relative">
      <div className="bg-gray-200 w-full h-[450px] absolute ">
        <CoverImage />
      </div>
      <div className=" w-[40%] h-[700px] absolute top-80 left-[10%]">
        <ProfileAbout />
      </div>
      <div className="w-[40%] bg-white absolute top-80 left-[52%] border-[1px] border-[#b8b8b8] rounded-lg p-3">
        <SupportCoffee />
      </div>
    </div>
  );
}
