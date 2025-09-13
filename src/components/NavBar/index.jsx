import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../images/logo.png";
import authContext from "../../store/store";
import { useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Index() {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const authCtx = useContext(authContext);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const signOutHandler = () => {
    localStorage.removeItem("token");
    authCtx.setToken(null);
    const notificationEvent = new CustomEvent("showNotification", {
      detail: { message: "Sesión cerrada exitosamente", type: "success" },
    });
    window.dispatchEvent(notificationEvent);
    closeNavbar();
  };

  const isAdmin = async (email) => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const response = await axios.get(`${API_URL}/role/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.role === "admin";
    } catch (error) {
      console.error("Error al recuperar rol:", error);
      return false;
    }
  };

  const toggleHandler = () => setToggle(!toggle);
  const closeNavbar = () => setToggle(false);

  const fetchUserRole = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setRole(null);
      authCtx.setToken(null);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const isAdminRole = await isAdmin(decoded.email);
      setRole(isAdminRole ? "admin" : "user");
      authCtx.setToken(token);
    } catch (error) {
      console.error("Error token/rol:", error);
      localStorage.removeItem("token");
      authCtx.setToken(null);
      setRole(null);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, [authCtx.token]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled ? "bg-black/70 backdrop-blur-md" : "bg-black"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-2 md:py-3">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="logo"
              className="h-10 md:h-12 w-auto transition-all duration-300"
            />
          </div>

          {/* Menú Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {[
              { to: "/", label: "Inicio" },
              { to: "/products", label: "Pagos" },
              { to: "/rutina", label: "Mi Rutina" },

              { to: "/about", label: "Información" },
              { to: "/contact", label: "Contacto" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-purple-400 bg-white/10"
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-purple-400 bg-white/10"
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                Admin
              </NavLink>
            )}
          </div>

          {/* Botones Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            {authCtx.token ? (
              <button
                onClick={signOutHandler}
                className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold transition-all duration-300 hover:bg-purple-700"
              >
                Cerrar Sesión
              </button>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold transition-all duration-300 hover:bg-purple-700"
              >
                Iniciar Sesión
              </NavLink>
            )}
          </div>

          {/* Botón hamburguesa (Mobile) */}
          <div className="lg:hidden z-50">
            <button
              onClick={toggleHandler}
              className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all"
            >
              <FontAwesomeIcon
                icon={toggle ? faXmark : faBars}
                className="text-lg"
              />
            </button>
          </div>
        </div>

        {/* Menú Mobile */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-md transform transition-transform duration-500 ease-in-out z-30 ${
            toggle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-6 py-20 h-full flex flex-col">
            <div className="flex-1">
              {[
                { to: "/", label: "Inicio" },
                { to: "/products", label: "Pagos" },
                { to: "/about", label: "Información" },
                { to: "/contact", label: "Contacto" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeNavbar}
                  className={({ isActive }) =>
                    `block py-3 px-4 text-base font-medium rounded-lg mb-2 transition-colors duration-300 ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "text-white hover:bg-gray-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {role === "admin" && (
                <NavLink
                  to="/admin"
                  onClick={closeNavbar}
                  className={({ isActive }) =>
                    `block py-3 px-4 text-base font-medium rounded-lg mb-2 transition-colors duration-300 ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "text-white hover:bg-gray-800"
                    }`
                  }
                >
                  Panel de Administración
                </NavLink>
              )}
            </div>
            <div className="pt-4 border-t border-gray-700">
              {authCtx.token ? (
                <button
                  onClick={signOutHandler}
                  className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={closeNavbar}
                  className="block w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg text-center hover:bg-purple-700 transition-colors duration-300"
                >
                  Iniciar Sesión
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido */}
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
}

export default Index;