import React from "react";
import { motion } from "framer-motion";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// Importa tus imágenes locales
import foto1 from "./img/foto1.jpg";
import foto2 from "./img/foto2.jpg";
import foto3 from "./img/foto3.jpg";
import foto4 from "./img/foto4.jpg";
import foto5 from "./img/foto5.jpg";

function TrainSection() {
  const images = [
    {
      original: foto1,
      thumbnail: foto1,
      description: "Vista de nuestro gimnasio principal.",
    },
    {
      original: foto2,
      thumbnail: foto2,
      description: "Zona de entrenamiento de pesas.",
    },
    {
      original: foto3,
      thumbnail: foto3,
      description: "Clase de yoga y estiramientos.",
    },
    {
      original: foto4,
      thumbnail: foto4,
      description: "Área de cardio con bicicletas y cintas.",
    },
    {
      original: foto5,
      thumbnail: foto5,
      description: "Sesión de entrenamiento personal.",
    },
  ];

  return (
    <motion.section
      className="relative overflow-hidden bg-gradient-to-b from-black via-[#0b0014] to-[#1a0025] text-white py-20 border-b border-white/10"
      id="nuestros-espacios"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.25, when: "beforeChildren" },
        },
      }}
    >
      <div className="container mx-auto px-6 z-20">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Título */}
          <motion.div
            className="w-full mb-12 z-20"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 1 } },
            }}
          >
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">
              Nuestros{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Espacios
              </span>
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto text-gray-300">
              Explora nuestras instalaciones diseñadas para tu bienestar, donde
              cada detalle está pensado para motivarte y llevarte más lejos.
            </p>
          </motion.div>

          {/* Galería */}
          <motion.div
            className="w-full lg:w-3/4 rounded-xl overflow-hidden shadow-2xl"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 1 } },
            }}
          >
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={true}
              showBullets={false}
              autoPlay={true}
              slideInterval={5000}
            />
          </motion.div>

          {/* Botón */}
          <motion.a
            href="#"
            className="mt-10 inline-block bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Descubre más
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}

export default TrainSection;
