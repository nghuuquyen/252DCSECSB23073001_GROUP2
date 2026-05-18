import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props) {
  return (
    <input
      className="border px-3 py-2 sm:px-4 sm:py-2.5 lg:px-4 lg:py-3 rounded lg:rounded-md w-full text-sm lg:text-base transition-all"
      {...props}
    />
  );
}