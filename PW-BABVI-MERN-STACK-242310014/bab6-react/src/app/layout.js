import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import BootstrapProvider from "@/components/ui/bootstrapClient";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <BootstrapProvider>
            {children}
          </BootstrapProvider>
        </AuthProvider>
      </body>
    </html>
  );
}