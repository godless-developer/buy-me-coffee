"use client";
import { useEffect, useState } from "react";
import CreateName from "./CreateName";
import CreatePaid from "./CreatePaid";

export default function userProfile() {
  const [currentStep, setCurrentStep] = useState(0);
  const FormSteps = [CreateName, CreatePaid][currentStep];

  useEffect(() => {
    setCurrentStep(Number(0));
  }, []);
  return (
    <div className="w-screen bg-white h-full px-20" key={currentStep}>
      {/* <CreateName /> */}
      {/* <CreatePaid /> */}
      <FormSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
}
