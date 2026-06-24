import Sidebar from "@/components/cms/components/sidebar";
import "./cms.css";

export default function CMSLayout({ children }) {
  return (
    <div className="cms-container">
      <Sidebar />

      <main className="main-content p-4">
        {children}
      </main>
    </div>
  );
}