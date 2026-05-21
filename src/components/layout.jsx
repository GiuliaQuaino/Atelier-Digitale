import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "24px", backgroundColor: "#f5f5f5" }}>
        <Outlet />  {/* qui si carica la pagina corrente */}
      </main>
    </div>
  );
}