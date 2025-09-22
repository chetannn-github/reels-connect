import { Loader } from "./Loader";
import { cn } from "../../lib/utils";

const FullScreenLoader = ({ 
  isVisible, 
  message = "Loading...", 
  variant = "default",
  className 
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-gray-900/90 backdrop-blur-md",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-6">
        <Loader size="xl" variant={variant} />
        {message && (
          <div className="text-center space-y-2">
            <p className="text-white text-xl font-semibold animate-pulse">
              {message}
            </p>
            <div className="flex space-x-1 justify-center">
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { FullScreenLoader };
