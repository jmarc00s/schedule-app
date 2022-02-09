import React, { ReactNode } from 'react';

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <section className="flex flex-col bg-gray-200 flex-1">
      <div className="bg-gray-50 px-10 py-5 ">{children}</div>
    </section>
  );
};

export default Content;
