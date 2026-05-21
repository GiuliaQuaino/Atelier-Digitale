import "./sidebar.css";

import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/> <polyline points="9 22 9 12 15 12 15 22"/> </svg>, label: "Dashboard", path: "/dashboard"},
  { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Mappa", path: "/mappa" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, label: "Statistiche", path: "/statistiche" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="12" x="4" y="4" rx="2"/><path d="M8 16v2"/><path d="M16 16v2"/><path d="M4 12h16"/></svg>, label: "Flotta", path: "/flotta" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>, label: "Manutenzione", path: "/manutenzione" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: "Segnalazioni", path: "/segnalazioni" },
  { icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label: "Gestione utenti", path: "/gestione-utenti" },
];

export default function Sidebar() {
  const { utente } = useAuth();

  const itemsVisibili = navItems.filter(item =>
    utente?.pagine?.includes(item.path.replace("/", ""))
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <span className="sidebar__logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#58A684" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a13 13 0 0 1-13 13"/>
            <path d="M9.5 15.3c.3-3.2 3.5-5.3 3.5-5.3"/></svg>
          </span>
        <span className="sidebar__logo-text">Green Mobility</span>
      </div>

      <hr className="sidebar__divider" />

      <nav className="sidebar__nav">
        {itemsVisibili.map(({ icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) => `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`} >
            <span className="sidebar__nav-icon">{icon}</span>
            <span className="sidebar__nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <p className="sidebar__footer-title">User Account</p>
        <div className="sidebar__user">
          <div className="sidebar__user-avatar"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
          <div className="sidebar__user-info">
            <span className="sidebar__user-name">{utente?.nome}</span>
            <span className="sidebar__user-role">{utente?.ruolo}</span>
          </div>
        </div>
      </div>


    </div>
  );
}