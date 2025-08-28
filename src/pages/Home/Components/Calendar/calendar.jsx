import React from "react";
import { motion } from "framer-motion";
import { faDumbbell, faFire, faPersonRunning, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

function CalendarioActividades() {
  const actividades = [
    {
      id: 1,
      nombre: "SALA DE MUSCULACIÓN",
      icono: faDumbbell,
      emoji: "💪🏼",
      descripcion:
        "Zona premium con equipos Hammer Strength y área de pesos libres. Asesoramiento profesional incluido.",
      horarios: ["Lunes a Viernes: 7:00 - 21:00", "Sábados: 10:00 - 14:00"],
      videoUrl:
        "https://res.cloudinary.com/dkeymyqcb/video/upload/v1756315822/5319752-uhd_3840_2160_25fps_jdunjz.mp4",
    },
    {
      id: 2,
      nombre: "G.A.P",
      icono: faPersonRunning,
      descripcion:
        "Sesiones intensivas de 45 minutos focalizadas en Glúteos, Abdomen y Piernas.",
      horarios: ["Lunes, Miércoles, Viernes: 18:15"],
      videoUrl:
        "https://res.cloudinary.com/dkeymyqcb/video/upload/v1756316463/18573486-hd_1920_1080_25fps_lhcc3j.mp4",
    },
    {
      id: 3,
      nombre: "CROSS-FUNCIONAL",
      icono: faFire,
      emoji: "🏋🏼‍♂️",
      descripcion:
        "Entrenamiento funcional de alta intensidad con equipamiento especializado.",
      horarios: [
        "Lunes/Miércoles/Viernes: 10:00, 19:00, 20:00",
        "Martes/Jueves: 14:00, 19:00, 20:00",
      ],
      videoUrl:
        "https://res.cloudinary.com/dkeymyqcb/video/upload/v1756316319/4812848-uhd_3840_2160_25fps_uzm1xm.mp4",
    },
    // {
    //   id: 4,
    //   nombre: "RITMOS",
    //   icono: faMusic,
    //   emoji: "🕺🏻",
    //   descripcion:
    //     "Clases grupales con coreografías divertidas y ritmos variados para entrenar bailando.",
    //   horarios: ["Martes y Jueves: 18:00"],
    //   videoUrl:
    //     "https://res.cloudinary.com/dkeymyqcb/video/upload/v1756316594/8956472-uhd_3840_2160_25fps_baibju.mp4",
    // },
  ];

  return (
    <section className="relative bg-gradient-to-b from-black via-[#0b0014] to-[#1a0025] text-white py-20 px-6">
      <div className="container mx-auto">
        <motion.h2
          className="text-center text-4xl md:text-5xl font-extrabold mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          HORARIOS{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            EXODIUM
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actividades.map((actividad, index) => (
            <motion.div
  key={actividad.id}
  className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-center relative overflow-hidden group flex flex-col h-full"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: index * 0.2 }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

  <FontAwesomeIcon
    icon={actividad.icono}
    className="text-4xl text-purple-400 mb-4 relative z-10"
  />
  <h3 className="text-2xl font-bold mb-2 relative z-10">
    {actividad.nombre} {actividad.emoji && actividad.emoji}
  </h3>
  <p className="text-lg text-gray-300 mb-4 relative z-10 flex-1">
    {actividad.descripcion}
  </p>

  <ul className="text-gray-400 mb-4 relative z-10 space-y-2">
    {actividad.horarios.map((horario, i) => (
      <li
        key={i}
        className="flex items-center justify-center gap-2 hover:text-purple-400 transition"
      >
        <FontAwesomeIcon icon={faClock} className="text-sm" />
        <span>{horario}</span>
      </li>
    ))}
  </ul>

  <video
    src={actividad.videoUrl}
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-40 object-cover rounded-lg mt-auto relative z-10"
  />
</motion.div>

          ))}
        </div>
      </div>
    </section>
  );
}

export default CalendarioActividades;
