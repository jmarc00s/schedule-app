import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './sidebar/Sidebar';

interface LayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

const Layout = ({ children, pageTitle }: LayoutProps) => {
  return (
    <section className="flex">
      <Sidebar />
      <section className="flex flex-col w-screen h-screen">
        <Header />
        <div className="pt-5 px-5 bg-gray-100 ">{children}</div>
      </section>
    </section>
  );
};

export default Layout;
