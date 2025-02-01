import { motion, AnimatePresence } from 'framer-motion';

interface GameStartAnimationProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
}

const GameStartAnimation = ({ isVisible, onAnimationComplete }: GameStartAnimationProps) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Lightning Effects */}
            <motion.div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`lightning-${i}`}
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(${Math.random() * 360}deg, transparent, rgba(59, 130, 246, 0.7), transparent)`,
                    clipPath: `polygon(${Math.random() * 100}% 0%, ${Math.random() * 100}% 100%, ${Math.random() * 100}% 100%, ${Math.random() * 100}% 0%)`
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: 3,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Background with smooth transition */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            />

            {/* Floating Particles */}
            <motion.div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: 0
                  }}
                  animate={{ 
                    y: [null, Math.random() * -500],
                    scale: [0, Math.random() * 2],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                />
              ))}
            </motion.div>

            {/* Energy Lines */}
            <motion.div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`line-${i}`}
                  className="absolute h-0.5 bg-blue-500/30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 200 + 100}px`,
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [1, 2, 1],
                    x: [0, Math.random() * 200 - 100]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </motion.div>

            {/* Split Panels with smoother transition */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 bg-black"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ 
                duration: 1,
                ease: [0.45, 0, 0.55, 1],
                delay: 2,
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-black"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ 
                duration: 1,
                ease: [0.45, 0, 0.55, 1],
                delay: 2,
              }}
            />

            {/* Main Content with fade transition */}
            <motion.div 
              className="relative z-10"
              exit={{ 
                scale: 1.2,
                opacity: 0,
                filter: "blur(10px)"
              }}
              transition={{ duration: 0.8 }}
            >
              {/* Energetic Burst Particles */}
              <motion.div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute w-2 h-2"
                    style={{
                      background: `rgb(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255)`,
                      borderRadius: '50%',
                      boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0,
                      scale: 0
                    }}
                    animate={{ 
                      x: Math.random() * 600 - 300,
                      y: Math.random() * 600 - 300,
                      scale: [0, Math.random() * 3],
                      opacity: [1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: 2,
                      delay: Math.random() * 0.5,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>

              {/* Main Text */}
              <motion.div
                className="text-center relative"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-8xl font-bold text-white mb-4"
                  style={{
                    textShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    textShadow: [
                      "0 0 20px rgba(59, 130, 246, 0)",
                      "0 0 50px rgba(59, 130, 246, 0.8)",
                      "0 0 20px rgba(59, 130, 246, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: 1 }}
                >
                  EARNIFY
                </motion.div>

                {/* Circular Wave Effects */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`wave-${i}`}
                    className="absolute top-1/2 left-1/2 rounded-full border-2 border-blue-500/30"
                    style={{
                      width: '4rem',
                      height: '4rem',
                      marginLeft: '-2rem',
                      marginTop: '-2rem'
                    }}
                    animate={{
                      scale: [1, 15],
                      opacity: [0.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>

              {/* Add flash effect on text */}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.5,
                  delay: 1.8
                }}
              />
            </motion.div>

            {/* Smooth transition to next page */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 2.2
              }}
              onAnimationComplete={() => {
                setTimeout(onAnimationComplete, 200);
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameStartAnimation; 