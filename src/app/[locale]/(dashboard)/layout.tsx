import React from 'react';
//= Auth Guard
import AuthGuard from "@/utils/authGuard";
//= Components
import PanelNavbar from '@/components/Panel/Layout/Navbar';
import PanelSidebar from '@/components/Panel/Layout/Sidebar';

async function Layout({ children }: { children: React.ReactNode }) {
  await AuthGuard({ ifUserExist: false, redirectTo: '/login' });

  return (
    <main className="panel_container">
      <PanelNavbar />
      <section className="content">
        <PanelSidebar />
        <div className="page_content">
          {children}
        </div>
      </section>
    </main>
  )
}

export default Layout
