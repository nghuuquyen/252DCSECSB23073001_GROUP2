import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const base = "px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded lg:rounded-md font-medium text-sm lg:text-base transition-all active:scale-95";

  const styles = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-200 text-black",
  };

  return (
    <button className={`${base} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}