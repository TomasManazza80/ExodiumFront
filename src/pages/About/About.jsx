import React from "react";
import { NavLink } from "react-router-dom";
import agustin from '../../components/images/team/agus.png';
import moni from '../../components/images/team/monifoto.png';
import maria from '../../components/images/team/fotomari.jpeg';
import { motion } from "framer-motion";

function About() {
  return (
    <div className="w-full overflow-x-hidden font-sans bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen py-20">
      <div className="container mx-auto px-4 text-center">
        
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-900/30 rounded-full filter blur-3xl animate-pulse-slow z-0"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-800/20 rounded-full filter blur-3xl animate-pulse-slow z-0"></div>

        {/* Quiénes Somos Section */}
        <section id="who-we-are" className="mb-20 relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-black mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white">QUIÉNES </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-300">SOMOS</span>
            <span className="ml-3">🌟</span>
          </motion.h1>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-light">
              En <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">EXODIUM GYM</span>, tu bienestar es nuestra prioridad. Nuestro equipo de profesionales
              altamente calificados te brindará la atención personalizada que
              necesitas para alcanzar tus objetivos de fitness, salud y bienestar.
              Estamos comprometidos con tu progreso.
            </p>
            
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-300 mx-auto my-8 rounded-full"></div>
            
            <p className="text-xl md:text-2xl leading-relaxed text-gray-300 font-light">
              ¿Poco tiempo? Nuestra moderna ubicación en{' '}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
                25 de Mayo 3162, Santa Fe Capital
              </span>
              , te ofrece fácil acceso y un entorno tranquilo y energizante para
              que te concentres plenamente en tu entrenamiento, sin distracciones.
              ¡Ven y descúbrelo!
            </p>
          </div>
        </section>

        {/* Conoce a Nuestro Equipo Section */}
        <section id="our-team" className="mb-20 relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-black mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">CONOCE A NUESTRO </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-300">EQUIPO</span>
            <span className="ml-3">👥</span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {/* Agustín */}
            <motion.div 
              className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl max-w-xs transform hover:scale-105 transition-all duration-300 border-t-4 border-purple-500 relative overflow-hidden"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full filter blur-xl"></div>
              <img
                src={agustin}
                className="w-40 h-40 object-cover rounded-full mx-auto mb-6 border-4 border-purple-500 shadow-lg relative z-10"
                alt="Agustín Nardoni"
              />
              <h3 className="text-2xl font-bold mb-2 text-purple-400">
                Agustín Nardoni
              </h3>
              <p className="text-lg text-gray-300 mb-6">Gym Coach</p>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://twitter.com/agustinnardoni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-3xl transition-colors duration-300 transform hover:scale-110"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://www.instagram.com/agustinnardoni/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-3xl transition-colors duration-300 transform hover:scale-110"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </motion.div>

            {/* Mónica */}
            <motion.div 
              className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl max-w-xs transform hover:scale-105 transition-all duration-300 border-t-4 border-purple-500 relative overflow-hidden"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full filter blur-xl"></div>
              <img
                src={moni}
                className="w-40 h-40 object-cover rounded-full mx-auto mb-6 border-4 border-purple-500 shadow-lg relative z-10"
                alt="Mónica Rosales"
              />
              <h3 className="text-2xl font-bold mb-2 text-purple-400">
                Mónica Rosales
              </h3>
              <p className="text-lg text-gray-300 mb-2">Body Jump Trainer</p>
              <p className="text-lg text-gray-300 mb-6">Gym Coach</p>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.instagram.com/monicarosales/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-3xl transition-colors duration-300 transform hover:scale-110"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.facebook.com/monicarosales"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-3xl transition-colors duration-300 transform hover:scale-110"
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </div>
            </motion.div>

            {/* María */}
            <motion.div 
              className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl max-w-xs transform hover:scale-105 transition-all duration-300 border-t-4 border-purple-500 relative overflow-hidden"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full filter blur-xl"></div>
              <img
                src={maria}
                className="w-40 h-40 object-cover rounded-full mx-auto mb-6 border-4 border-purple-500 shadow-lg relative z-10"
                alt="María Giovagnoli"
              />
              <h3 className="text-2xl font-bold mb-2 text-purple-400">
                María Giovagnoli
              </h3>
              <p className="text-lg text-gray-300 mb-6">Gym Coach</p>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://twitter.com/mariagiovagnoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-3xl transition-colors duration-300 transform hover:scale-110"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://www.instagram.com/mariagiovagnoli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-3xl transition-colors duration-300 transform hover:scale-110"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Go Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <NavLink
            to="/"
            className="py-4 px-10 text-lg font-semibold rounded-full transition-all duration-300
                       bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500
                       focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75 mt-12 inline-block
                       transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Volver al Inicio
          </NavLink>
        </motion.div>
      </div>
    </div>
  );
}

export default About;