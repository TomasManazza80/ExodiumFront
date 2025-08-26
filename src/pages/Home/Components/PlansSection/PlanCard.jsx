import React from 'react';
import { motion } from 'framer-motion';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PurpleBtn from '../PurpleBtn/PurpleBtn';

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

const PlanCard = ({ title, price, description, features, buttonText, isFeatured }) => {
    return (
        <motion.div
            className={`flex-1 min-w-[300px] max-w-md ${isFeatured ? 'lg:scale-110 lg:-translate-y-5 z-10' : ''}`}
            variants={cardVariants}
        >
            <div className={`bg-[#1c1825] rounded-2xl p-10 shadow-lg border border-[rgba(139,0,255,0.2)] transition-all duration-300 ease-in-out h-full flex flex-col justify-between hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-[rgba(139,0,255,0.4)] ${isFeatured ? 'border-2 border-[#8b00ff] relative overflow-hidden' : ''}`}>
                
                {isFeatured && (
                    <div className="absolute top-4 -right-8 bg-[#8b00ff] text-white text-xs font-bold py-1 px-8 uppercase rotate-45">
                        POPULAR
                    </div>
                )}
                
                <div>
                    <h3 className="text-xl font-semibold text-[#d1b4ff] uppercase mb-3">{title}</h3>
                    <p className="text-4xl font-extrabold text-white mb-5 drop-shadow-[0_0_15px_rgba(139,0,255,0.7)]">{price}</p>
                    <p className="text-sm text-[#b0b0b0] min-h-[40px] mb-6">{description}</p>
                    
                    <ul className="text-left mb-8">
                        {features.map((feature, index) => (
                            <li key={index} className="text-[#e0e0e0] mb-3 flex items-start">
                                <FontAwesomeIcon icon={faCheck} className="text-[#8b00ff] mr-3 mt-1" /> 
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="mt-auto">
                    <PurpleBtn btnTitle={buttonText} />
                </div>
            </div>
        </motion.div>
    );
};

export default PlanCard;