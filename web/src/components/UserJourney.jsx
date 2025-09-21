import { useState, useEffect } from "react";
import { Instagram, Target, Hash, Zap, CheckCircle } from "lucide-react";

const UserJourney = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Instagram,
      title: "Connect Instagram",
      description: "Securely link your Instagram account in seconds",
      time: "30 seconds",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Target,
      title: "Select Reels",
      description: "Choose which type of reels you want to automate",
      time: "1 minute",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Hash,
      title: "Add Keywords",
      description: "Set your target keywords and content preferences",
      time: "2 minutes",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Zap,
      title: "Automation Ready",
      description: "Sit back and watch your reels go viral automatically",
      time: "Instant",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className="py-24 px-6">
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
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= activeStep;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex items-center ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col gap-8 lg:gap-16`}
                >
                  {/* Content */}
                  <div 
                    className={`flex-1 ${
                      isLeft ? 'lg:text-right' : 'lg:text-left'
                    } text-center lg:pr-8 lg:pl-8`}
                  >
                    <div
                      className={`transition-all duration-1000 ${
                        isActive 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-50 translate-y-8'
                      }`}
                    >
                      <div className="glass-effect p-8 rounded-2xl card-shadow">
                        <div className="flex items-center justify-center mb-4">
                          <span className={`${step.color} text-sm font-semibold px-3 py-1 rounded-full ${step.bgColor}`}>
                            {step.time}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative z-10">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center glass-effect transition-all duration-1000 ${
                        isActive 
                          ? 'scale-110 glow-effect' 
                          : 'scale-100'
                      }`}
                    >
                      {isActive && index === activeStep ? (
                        <Icon className={`w-10 h-10 ${step.color} animate-scale-in`} />
                      ) : isActive ? (
                        <CheckCircle className="w-10 h-10 text-success" />
                      ) : (
                        <Icon className="w-10 h-10 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden lg:block" />
                </div>
              );
            })}
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