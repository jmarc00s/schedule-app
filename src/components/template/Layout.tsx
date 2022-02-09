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
    <section className="flex flex-col w-screen h-screen">
      <Header />
      <section className="flex flex-1">
        <Sidebar />
        <Content>{children}</Content>
      </section>
    </section>
  );
};

export default Layout;
