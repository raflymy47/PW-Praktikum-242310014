"use client";

import Link from "next/link";
import { Menu_CMS } from "@/const/menu_cms";

export default function Sidebar() {
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
    </div>
  );
}