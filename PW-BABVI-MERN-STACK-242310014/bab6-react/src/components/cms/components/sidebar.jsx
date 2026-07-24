"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Menu_CMS } from "@/const/menu_cms";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/sign-in");
  };

  return (
    <div className="bg-success text-white p-3 vh-100">
      <h4>CMS Ready+</h4>

      {Menu_CMS.map((item, index) => (
        <div key={index} className="mt-4">
          <Link
            href={item.path}
            className="text-white text-decoration-none"
          >
            <i className={`bi ${item.icon} me-2`}></i>
            {item.name}
          </Link>
        </div>
      ))}

      <div className="mt-5">
        <button
          className="btn btn-danger w-100"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
}