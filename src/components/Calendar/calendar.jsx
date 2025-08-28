import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { faDumbbell, faFire, faPersonRunning, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./calendar.css";

const actividades = [
  {
    id: 1,
    nombre: "SALA DE MUSCULACIÓN",
    icono: faDumbbell,
    emoji: "💪🏼",
    descripcion: "Zona premium con equipos Hammer Strength y área de pesos libres. Asesoramiento profesional incluido.",
    horarios: ["Lunes a Viernes: 7:00 - 21:00", "Sábados: 10:00 - 14:00"],
  },
  {
    id: 2,
    nombre: "G.A.P",
    icono: faPersonRunning,
    descripcion: "Sesiones intensivas de 45 minutos focalizadas en Glúteos, Abdomen y Piernas.",
    horarios: ["Lunes, Miércoles, Viernes: 18:15"],
  },
  {
    id: 3,
    nombre: "CROSS-FUNCIONAL",
    icono: faFire,
    emoji: "🏋🏼‍♂️",
    descripcion: "Entrenamiento funcional de alta intensidad con equipamiento especializado.",
    horarios: ["Lunes/Miércoles/Viernes: 10:00, 19:00, 20:00", "Martes/Jueves: 14:00, 19:00, 20:00"],
  },
  {
    id: 4,
    nombre: "RITMOS",
    icono: faMusic,
    emoji: "🕺🏻",
    descripcion: "Clases grupales con coreografías divertidas y ritmos variados para entrenar bailando.",
    horarios: ["Martes y Jueves: 18:00"],
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 50, scale: 0.95 },
  onscreen: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.3, duration: 0.8 } },
};

const CalendarioActividades = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section ref={containerRef} className="horarios-section">
      <div className="container">
        <motion.h2
          className="section-title text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          HORARIOS <span className="highlight">EXODIUM</span>
        </motion.h2>

        <div className="actividades-grid">
          {actividades.map((act, i) => (
            <motion.div
              key={act.id}
              className="actividad-card"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(100, 0, 150, 0.4)" }}
            >
              <div className="actividad-header">
                <FontAwesomeIcon icon={act.icono} className="actividad-icon" />
                <h3 className="actividad-title">
                  {act.nombre} {act.emoji && <span className="emoji">{act.emoji}</span>}
                </h3>
              </div>
              <p className="actividad-desc">{act.descripcion}</p>
              <div className="horarios-box">
                <h4>HORARIOS:</h4>
                <ul>
                  {act.horarios.map((h, idx) => (
                    <motion.li key={idx} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 350 }}>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(CalendarioActividades);