import { CheckCircle } from "lucide-react";

function Step({step, index,activeStep}) {
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
}

export default Step