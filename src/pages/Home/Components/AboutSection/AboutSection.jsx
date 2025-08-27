import React from 'react';
import { motion } from 'framer-motion';
import PurpleBtn from '../PurpleBtn/PurpleBtn';

function AboutSection() {
  return (
    <motion.section 
      className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white overflow-hidden"
      id='about'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-soft-light filter blur-xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-5 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:shadow-purple-900/30 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <motion.video 
                className="w-[350px] h-auto rounded-2xl"
                autoPlay
                muted
                loop
                playsInline
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <source src="https://res.cloudinary.com/dxvkqumpu/video/upload/v1756253275/Por_que_no_solo_es_un_gimnasio_es_nuestra_familia_y_vos_tambi%C3%A9n_podes_ser_parte_ella_familia_1_srnwg0.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </motion.video>
              
              {/* Marco decorativo */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none"></div>
            </div>
            
            {/* Elemento decorativo */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-600/20 rounded-full blur-md"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-indigo-600/20 rounded-full blur-md"></div>
          </motion.div>

          <motion.div
            className="space-y-6 lg:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Conoce <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Exodium</span>
            </motion.h2>

            <motion.div 
              className="space-y-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                En <strong className="text-purple-300">Exodium Gym</strong> no solo transformamos cuerpos, forjamos mentalidades ganadoras. Somos el espacio donde los límites se rompen y cada entrenamiento es un paso hacia la mejor versión de ti.
              </p>

              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                Nuestro diferencial: <strong className="text-purple-300">entrenadores certificados</strong> que diseñan programas personalizados, clases grupales que desafían tus capacidades, y una filosofía que combina disciplina con diversión.
              </p>
            </motion.div>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7, type: "spring", stiffness: 200 }}
            >
              <PurpleBtn btnTitle='Descubre más' />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutSection;