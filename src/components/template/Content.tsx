import React, { ReactNode } from 'react';

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <section className="px-10 py-5 flex flex-col bg-gray-200" style={{ height: '95%' }}>
      {children}
    </section>
  );
};

export default Content;
