import React from "react";
import { NavLink } from "react-router-dom";
import agustin from '../../components/images/team/agus.png';
import moni from '../../components/images/team/monifoto.png';
import maria from '../../components/images/team/fotomari.jpeg';
import { motion } from "framer-motion";
import Staf from "../Home/Components/staf/staf";

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
          
          </motion.h1>

          <Staf/>

       
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