import { twMerge } from "tailwind-merge";

export const PrettyBox: React.FC<
  React.PropsWithChildren & { className?: string; onClick?: () => void }
> = ({ children, className, onClick }) => {
  return (
    <div
      className={twMerge("bg-white rounded-md p-6 shadow-sm", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
