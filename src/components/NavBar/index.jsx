import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../images/logo.png";
import authContext from "../../store/store";
import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const signOutHandler = () => {
    localStorage.removeItem("token");
    authCtx.setToken(null);
    
    // Mostrar notificación elegante en lugar de alert
    const notificationEvent = new CustomEvent('showNotification', {
      detail: {
        message: 'Sesión cerrada exitosamente',
        type: 'success'
      }
    });
    window.dispatchEvent(notificationEvent);
    
    closeNavbar();
  };

  const isAdmin = async (email) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no encontrado!");
      return false;
    }

    try {
      const response = await axios.get(`${API_URL}/role/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.role === "admin";
    } catch (error) {
      console.error(`Error al recuperar el rol de usuario: ${error}`);
      return false;
    }
  };

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const closeNavbar = () => {
    setToggle(false);
  };

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
      console.error("Error al decodificar el token o al obtener el rol:", error);
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
      <div className="">
        {/* Navbar con fondo negro que se vuelve transparente al bajar */}
        <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out ${
          scrolled 
            ? "bg-transparent backdrop-blur-sm py-4" 
            : "bg-black py-4"
        }`}>
          <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="logo" 
                className="h-16 md:h-20 w-auto transition-all duration-300" 
              />
            </div>

            {/* Navegación para pantallas grandes */}
            <div className="hidden lg:flex items-center space-x-1">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-purple-400 bg-white/10" 
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                Inicio
              </NavLink>
              <NavLink 
                to="/products" 
                className={({ isActive }) => 
                  `px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-purple-400 bg-white/10" 
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                Pagos
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-purple-400 bg-white/10" 
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                Información
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-purple-400 bg-white/10" 
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                Contacto
              </NavLink>
              {role === "admin" && (
                <NavLink 
                  to="/admin" 
                  className={({ isActive }) => 
                    `px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
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

            {/* Botones de Login/Logout para pantallas grandes */}
            <div className="hidden lg:flex items-center space-x-3">
              {authCtx.token ? (
                <button
                  onClick={signOutHandler}
                  className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold transition-all duration-300 hover:bg-purple-700"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <NavLink 
                  to="/login" 
                  className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold transition-all duration-300 hover:bg-purple-700"
                >
                  Iniciar Sesión
                </NavLink>
              )}
            </div>

            {/* Botón de hamburguesa para móviles */}
            <div className="lg:hidden z-50">
              <button
                onClick={toggleHandler}
                className="p-3 bg-white/10 text-white rounded-full transition-all duration-300 hover:bg-white/20"
              >
                <FontAwesomeIcon
                  icon={toggle ? faXmark : faBars}
                  className="text-xl"
                />
              </button>
            </div>
          </div>

          {/* Menú desplegable para móviles */}
          <div
            className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-md transform transition-transform duration-500 ease-in-out z-30 ${
              toggle ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="px-6 py-24 h-full flex flex-col">
              <div className="flex-1">
                <NavLink
                  to="/"
                  className={({ isActive }) => 
                    `block py-4 px-4 text-lg font-medium rounded-lg mb-2 transition-colors duration-300 ${
                      isActive 
                        ? "bg-purple-600 text-white" 
                        : "text-white hover:bg-gray-800"
                    }`
                  }
                  onClick={closeNavbar}
                >
                  Inicio
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) => 
                    `block py-4 px-4 text-lg font-medium rounded-lg mb-2 transition-colors duration-300 ${
                      isActive 
                        ? "bg-purple-600 text-white" 
                        : "text-white hover:bg-gray-800"
                    }`
                  }
                  onClick={closeNavbar}
                >
                  Pagos
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) => 
                    `block py-4 px-4 text-lg font-medium rounded-lg mb-2 transition-colors duration-300 ${
                      isActive 
                        ? "bg-purple-600 text-white" 
                        : "text-white hover:bg-gray-800"
                    }`
                  }
                  onClick={closeNavbar}
                >
                  Información
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => 
                    `block py-4 px-4 text-lg font-medium rounded-lg mb-2 transition-colors duration-300 ${
                      isActive 
                        ? "bg-purple-600 text-white" 
                        : "text-white hover:bg-gray-800"
                    }`
                  }
                  onClick={closeNavbar}
                >
                  Contacto
                </NavLink>
                {role === "admin" && (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) => 
                      `block py-4 px-4 text-lg font-medium rounded-lg mb-2 transition-colors duration-300 ${
                        isActive 
                          ? "bg-purple-600 text-white" 
                          : "text-white hover:bg-gray-800"
                      }`
                    }
                    onClick={closeNavbar}
                  >
                    Panel de Administración
                  </NavLink>
                )}
              </div>
              
              <div className="pt-6 border-t border-gray-700">
                {authCtx.token ? (
                  <button
                    onClick={signOutHandler}
                    className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="block w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg text-center hover:bg-purple-700 transition-colors duration-300"
                    onClick={closeNavbar}
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Espacio para el contenido */}
        <div className="pt-28">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Index;