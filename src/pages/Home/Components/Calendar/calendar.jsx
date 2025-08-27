import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { faDumbbell, faFire, faPersonRunning, faMusic, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const actividades = [
  {
    id: 1,
    nombre: "SALA DE MUSCULACIÓN",
    icono: faDumbbell,
    emoji: "💪🏼",
    descripcion: "Zona premium con equipos Hammer Strength y área de pesos libres. Asesoramiento profesional incluido.",
    horarios: ["Lunes a Viernes: 7:00 - 21:00", "Sábados: 10:00 - 14:00"],
    videoUrl: "https://res.cloudinary.com/dkeymyqcb/video/upload/v1756315822/5319752-uhd_3840_2160_25fps_jdunjz.mp4"
  },
  {
    id: 2,
    nombre: "G.A.P",
    icono: faPersonRunning,
    descripcion: "Sesiones intensivas de 45 minutos focalizadas en Glúteos, Abdomen y Piernas.",
    horarios: ["Lunes, Miércoles, Viernes: 18:15"],
    videoUrl: "https://res.cloudinary.com/dkeymyqcb/video/upload/v1756316463/18573486-hd_1920_1080_25fps_lhcc3j.mp4"
  },
  {
    id: 3,
    nombre: "CROSS-FUNCIONAL",
    icono: faFire,
    emoji: "🏋🏼‍♂️",
    descripcion: "Entrenamiento funcional de alta intensidad con equipamiento especializado.",
    horarios: ["Lunes/Miércoles/Viernes: 10:00, 19:00, 20:00", "Martes/Jueves: 14:00, 19:00, 20:00"],
    videoUrl: "https://res.cloudinary.com/dkeymyqcb/video/upload/v1756316319/4812848-uhd_3840_2160_25fps_uzm1xm.mp4"
  },
  {
    id: 4,
    nombre: "RITMOS",
    icono: faMusic,
    emoji: "🕺🏻",
    descripcion: "Clases grupales con coreografías divertidas y ritmos variados para entrenar bailando.",
    horarios: ["Martes y Jueves: 18:00"],
    videoUrl: "https://res.cloudinary.com/dkeymyqcb/video/upload/v1756316594/8956472-uhd_3840_2160_25fps_baibju.mp4"
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 50, scale: 0.95 },
  onscreen: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.3, duration: 0.8 } },
};

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-gray-900 rounded-xl p-6 relative max-w-4xl w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center z-10"
          onClick={onClose}
        >
          ×
        </button>
        <div className="relative pt-[56.25%]">
          <video
            src={videoUrl}
            title="Video de la actividad"
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            controls
            autoPlay
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const CalendarioActividades = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideo = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section ref={containerRef} className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          HORARIOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">EXODIUM</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {actividades.map((act, i) => (
            <motion.div
              key={act.id}
              className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 overflow-hidden"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.03, boxShadow: "0 15px 40px rgba(100, 0, 150, 0.4)" }}
            >
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={act.icono} className="text-2xl text-purple-400 mr-3" />
                <h3 className="text-xl font-bold">
                  {act.nombre} {act.emoji && <span className="ml-2">{act.emoji}</span>}
                </h3>
              </div>
              
              {/* Video incorporado directamente - se reproduce automáticamente sin controles */}
              <div 
                className="relative pt-[56.25%] mb-4 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openVideo(act.videoUrl)}
              >
                <video
                  src={act.videoUrl}
                  title={`Video de ${act.nombre}`}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                {/* Overlay sutil que solo aparece al hacer hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="bg-black bg-opacity-50 text-white rounded-full p-3">
                    <FontAwesomeIcon icon={faPlayCircle} className="text-2xl" />
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{act.descripcion}</p>
              
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-purple-300">HORARIOS:</h4>
                <ul className="space-y-2">
                  {act.horarios.map((h, idx) => (
                    <motion.li 
                      key={idx} 
                      className="text-gray-200"
                      whileHover={{ x: 5 }} 
                      transition={{ type: "spring", stiffness: 350 }}
                    >
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        <VideoModal 
          isOpen={!!selectedVideo} 
          onClose={closeVideo} 
          videoUrl={selectedVideo} 
        />
      </div>
    </section>
  );
};

export default React.memo(CalendarioActividades);