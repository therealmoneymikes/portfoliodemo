import React from "react";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <aside className="bg-slate-200 p-5 mr-5">Admin Sidebar</aside>
      <nav>
        <ul className="flex ml-1 justify-between">
          <li>Home</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
