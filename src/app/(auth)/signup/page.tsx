"use client";
import { useState } from "react";
import SignEmailPass from "./SignEmailPass";
import SignUsername from "./SignUsername";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const FormSteps = [SignUsername, SignEmailPass][currentStep];
  const [signUps, setSignUps] = useState<string | null>(null);
  if (signUps) {
    localStorage.setItem("username", signUps);
  }
  const router = useRouter();
  const signUp = async (email: string, password: string) => {
    try {
      await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signUps,
          email: email,
          password: password,
        }),
      });
      router.push("./login");
    } catch (error) {
      console.log("error", error);
      alert("error in getting user");
    }
  };
  return (
    <div className="bg-white max-h-screen w-[50%]">
      <FormSteps
        setSignUps={setSignUps}
        signUp={signUp}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
}
