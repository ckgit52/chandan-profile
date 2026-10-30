import { cn } from "@/lib/utils";

interface LoaderProps {
  text?: string;
  classNames?: string;
}

export const GenerateLoader: React.FC<LoaderProps> = ({
  text = "Loading...",
  classNames,
}) => {
  const letters = text.split("");

  return (
    <div className={cn("relative", classNames || "")}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className="animate-loaderLetter inline-block text-black opacity-40 dark:text-white"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {letter}
        </span>
      ))}
      <style jsx>{`
        @keyframes loaderLetter {
          0%,
          100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          20% {
            opacity: 1;
            transform: scale(1.15);
          }
          40% {
            opacity: 0.7;
            transform: translateY(0);
          }
        }

        .animate-loaderCircle {
          animation: loaderCircle 5s linear infinite;
        }

        .animate-loaderLetter {
          animation: loaderLetter 3s infinite;
        }
      `}</style>
    </div>
  );
};
