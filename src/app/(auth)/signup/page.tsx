"use client";
import { useEffect, useState } from "react";
import SignEmailPass from "./SignEmailPass";
import SignUsername from "./SignUsername";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const FormSteps = [SignUsername, SignEmailPass][currentStep];
  useEffect(() => {
    setCurrentStep(Number(0));
  }, []);
  return (
    <div className="bg-white max-h-screen w-[50%]">
      {/* <SignUsername /> */}
      {/* <SignEmailPass /> */}
      <FormSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
}
