import { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import authContext from "../../store/store";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();
  const authCtx = useContext(authContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("*Formato de email inválido").required("*El email es requerido"),
    password: Yup.string().required("*La contraseña es requerida"),
  });

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const data = { email: values.email, password: values.password };
      const response = await axios.post(`${API_URL}/login`, data);

      alert(`¡Bienvenido de nuevo, ${response.data.email}!`);
      authCtx.setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setStatus({
        error: error.response?.data?.message || "Credenciales inválidas. Intenta de nuevo.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    authCtx.setToken(token);
    if (token) {
      navigate("/");
    }
  }, [authCtx, navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <NavLink to="/" className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center">
          <span className="text-white">EXODIUM </span>
          <span className="bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">
            GYM
          </span>
        </h1>
      </NavLink>

      {/* Card del formulario */}
      <div className="w-full max-w-md bg-[#111] p-8 rounded-2xl shadow-lg border border-purple-600/30">
        <h2 className="text-3xl font-extrabold text-center mb-8">
          <span className="text-white">INICIAR </span>
          <span className="bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
            SESIÓN
          </span>
        </h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting, status }) => (
            <Form className="space-y-6">
              {/* Campo Email */}
              <div>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Tu email"
                  className="w-full p-3 rounded-lg bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="email" component="p" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Campo Contraseña */}
              <div>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  className="w-full p-3 rounded-lg bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="password" component="p" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Mensaje de error del servidor */}
              {status && status.error && (
                <p className="text-red-400 text-center mt-2">{status.error}</p>
              )}

              {/* Botón Login */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 font-bold rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Enlace Registro */}
        <p className="mt-8 text-gray-400 text-center">
          ¿No tienes una cuenta?{" "}
          <NavLink to="/signup" className="text-purple-400 hover:underline font-semibold">
            Regístrate
          </NavLink>
        </p>

        {/* Botón volver al inicio */}
        <div className="mt-6 text-center">
          <NavLink
            to="/"
            className="px-6 py-2 rounded-full font-bold text-purple-400 border border-purple-500 hover:bg-purple-500 hover:text-white transition-all"
          >
            Volver al inicio
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
