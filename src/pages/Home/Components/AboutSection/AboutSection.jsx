import React from 'react';
import { motion } from 'framer-motion';
import AboutImg from '../Assets/Images/about-img.jpg';
import PurpleBtn from '../PurpleBtn/PurpleBtn';

function AboutSection() {
  return (
    <motion.section 
      id="about"
      className="py-20 bg-black text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.3, when: "beforeChildren" }
        }
      }}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Imagen */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }
          }}
        >
          <motion.img 
            src={AboutImg} 
            alt="Imagen de nuestro gimnasio"
            className="rounded-2xl shadow-lg w-full object-cover"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        {/* Texto */}
        <motion.div
          className="space-y-6"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.6, 0.01, 0.12, 0.95] }
            }
          }}
        >
          <motion.h2 
            className="text-4xl font-extrabold"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
          >
            Conoce <span className="text-purple-500">Exodium</span>
          </motion.h2>

          <motion.p
            className="text-gray-300 leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }
            }}
          >
            En <strong>Exodium Gym</strong> no solo transformamos cuerpos, 
            forjamos mentalidades ganadoras. Somos el espacio donde los límites 
            se rompen y cada entrenamiento es un paso hacia la mejor versión de ti.
          </motion.p>

          <motion.p
            className="text-gray-300 leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
            }}
          >
            Nuestro diferencial: <strong>entrenadores certificados</strong> que diseñan 
            programas personalizados, clases grupales que desafían tus capacidades, 
            y una filosofía que combina disciplina con diversión.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }
              }
            }}
          >
            <PurpleBtn btnTitle="Descubre más" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AboutSection;
