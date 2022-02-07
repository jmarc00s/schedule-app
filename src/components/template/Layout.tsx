import { ReactNode } from 'react';
import Content from './Content';
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
        <Content>{children}</Content>
      </section>
    </section>
  );
};

export default Layout;
