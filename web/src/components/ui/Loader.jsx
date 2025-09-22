import { cn } from "../../lib/utils";

const Loader = ({ size = "md", variant = "default", className }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  if (variant === "dots") {
    const dotSizes = {
      sm: "w-2 h-2",
      md: "w-3 h-3",
      lg: "w-4 h-4",
      xl: "w-5 h-5",
    };

    return (
      <div className={cn("flex items-center justify-center space-x-2", className)}>
        <div
          className={cn(
            dotSizes[size],
            "bg-gradient-to-r from-purple-500 to-purple-400 rounded-full animate-bounce shadow-lg shadow-purple-500/50"
          )}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={cn(
            dotSizes[size],
            "bg-gradient-to-r from-purple-400 to-orange-500 rounded-full animate-bounce shadow-lg shadow-orange-500/50"
          )}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={cn(
            dotSizes[size],
            "bg-gradient-to-r from-orange-500 to-orange-400 rounded-full animate-bounce shadow-lg shadow-orange-500/50"
          )}
          style={{ animationDelay: "300ms" }}
        />
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("relative", className)}>
        <div
          className={cn(
            sizeClasses[size],
            "bg-gradient-to-r from-purple-500 to-orange-500 rounded-full animate-pulse shadow-2xl shadow-purple-500/50"
          )}
        />
        <div
          className={cn(
            sizeClasses[size],
            "absolute inset-0 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full animate-ping opacity-20"
          )}
        />
      </div>
    );
  }

  if (variant === "orbit") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-2 border-gray-800/30" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-purple-400 animate-spin shadow-lg shadow-purple-500/30" />
        <div
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-orange-500 border-l-orange-400 animate-spin shadow-lg shadow-orange-500/30"
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  if (variant === "wave") {
    const barSizes = {
      sm: "w-1 h-6",
      md: "w-1.5 h-8",
      lg: "w-2 h-10",
      xl: "w-3 h-12",
    };

    return (
      <div className={cn("flex items-end justify-center space-x-1", className)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              barSizes[size],
              "bg-gradient-to-t from-purple-500 to-orange-500 rounded-full animate-pulse shadow-lg",
              i % 2 === 0 ? "shadow-purple-500/50" : "shadow-orange-500/50"
            )}
            style={{
              animationDelay: `${i * 100}ms`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "spinner") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 border-4 border-gray-800/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-purple-400 rounded-full animate-spin shadow-xl shadow-purple-500/40" />
        <div
          className="absolute inset-1 border-2 border-transparent border-b-orange-500 rounded-full animate-spin shadow-lg shadow-orange-500/30"
          style={{ animationDirection: "reverse" }}
        />
      </div>
    );
  }

  // Default enhanced loader
  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 border-4 border-gray-800/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-orange-500 rounded-full animate-spin shadow-2xl shadow-purple-500/50" />
      <div
        className="absolute inset-2 border-2 border-transparent border-b-purple-400 border-l-orange-400 rounded-full animate-spin shadow-lg shadow-orange-500/30"
        style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50" />
      </div>
    </div>
  );
};

export { Loader };
