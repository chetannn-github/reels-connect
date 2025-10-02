import { useState, useEffect } from "react";
import { steps } from "../../../lib/utils";
import Step from "../../../components/UserJourney/Step";

const UserJourney = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="py-24 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            From Setup to
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
              Success in Minutes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process gets you from zero to automated Instagram growth in just 4 simple steps
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border hidden lg:block">
            <div 
              className="bg-gradient-to-b from-primary to-accent w-full transition-all duration-1000 ease-out"
              style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => <Step step = {step} key={index} index = {index} activeStep={activeStep} />)}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-16 gap-3">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= activeStep 
                  ? 'bg-primary scale-110' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserJourney;