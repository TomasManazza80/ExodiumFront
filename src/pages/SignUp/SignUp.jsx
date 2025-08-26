import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import authContext from "../../store/store";

const API_URL = "https://newstylegym-back.onrender.com";

function SignUp() {
  const authCtx = useContext(authContext);
  const navigate = useNavigate();

  const opcionesActividad = ["1 actividad", "pase libre", "Estudiante"];

  const initialValues = {
    name: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
    actividad: "",
    termsAndConditions: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*El nombre es requerido"),
    number: Yup.number()
      .typeError("*Debe ser un número válido")
      .required("*El número de teléfono es requerido"),
    email: Yup.string().email("Formato de email inválido").required("*El email es requerido"),
    password: Yup.string()
      .min(6, "*La contraseña debe tener al menos 6 caracteres")
      .required("*La contraseña es requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("*Confirmar contraseña es requerido"),
    actividad: Yup.string()
      .oneOf(opcionesActividad, "Por favor selecciona una actividad válida")
      .required("*La actividad es requerida"),
    termsAndConditions: Yup.boolean().oneOf(
      [true],
      "Debes aceptar los términos y condiciones para registrarte"
    ),
  });

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const data = {
        name: values.name,
        number: values.number.toString(),
        email: values.email,
        password: values.password,
        actividad: values.actividad,
      };

      const response = await axios.post(`${API_URL}/createuser`, data);
      console.log("Respuesta del servidor:", response);
      navigate("/login");
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setStatus({
        error:
          error.response?.data?.message ||
          "Ocurrió un error al registrar el usuario. Intenta de nuevo.",
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
      {/* Logo/Título */}
      <NavLink to="/" className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-purple-500 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-lg">
          EXODIUM GYM
        </h1>
      </NavLink>

      {/* Formulario */}
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-xl border border-neutral-800">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Crea tu cuenta
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-6">
              {/* Nombre */}
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="name" component="p" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Teléfono */}
              <div>
                <Field
                  type="number"
                  name="number"
                  placeholder="Número de teléfono"
                  className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="number" component="p" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Email */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Tu email"
                  className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="email" component="p" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Contraseña */}
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="password" component="p" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Confirmar contraseña */}
              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="confirmPassword" component="p" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Selección de actividad */}
              <div>
                <label htmlFor="actividad" className="block text-gray-300 mb-2">
                  Selecciona tu actividad
                </label>
                <Field
                  as="select"
                  name="actividad"
                  id="actividad"
                  className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">-- Selecciona una opción --</option>
                  {opcionesActividad.map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="actividad" component="p" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Términos */}
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="termsAndConditions"
                  id="termsAndConditions"
                  className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="termsAndConditions" className="ml-2 text-gray-300 cursor-pointer">
                  Acepto los{" "}
                  <NavLink to="/terms" className="text-purple-400 hover:underline">
                    términos y condiciones
                  </NavLink>
                </label>
              </div>
              <ErrorMessage name="termsAndConditions" component="p" className="text-red-400 text-sm" />

              {/* Errores generales */}
              {status && status.error && (
                <p className="text-red-400 text-center mt-4">{status.error}</p>
              )}

              {/* Botón principal */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-6 rounded-lg font-bold text-lg text-white bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:opacity-90 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Registrando..." : "Registrarse"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Enlace para login */}
        <p className="mt-8 text-gray-400 text-center">
          ¿Ya tienes una cuenta?{" "}
          <NavLink to="/login" className="text-purple-400 hover:underline font-semibold">
            Inicia sesión
          </NavLink>
        </p>

        {/* Botón volver al inicio */}
        <NavLink
          to="/"
          className="mt-6 block w-full text-center py-2 rounded-lg border border-purple-500 text-purple-400 font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
        >
          Volver al inicio
        </NavLink>
      </div>
    </div>
  );
}

export default SignUp;
