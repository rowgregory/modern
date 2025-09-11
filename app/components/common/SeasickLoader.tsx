import { motion } from 'framer-motion'

const SeasickLoader = () => {
  const dots = [0, 1, 2, 3]

  const colors = ['bg-teal-500', 'bg-teal-400', 'bg-blue-500', 'bg-blue-400', 'bg-cyan-500'] // gradient across the dots

  return (
    <div className="flex items-center justify-center space-x-1 h-4">
      {dots.map((i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full ${colors[i]}`}
          animate={{
            y: [0, -4, 0] // smaller wave
          }}
          transition={{
            delay: i * 0.1, // stagger for wave effect
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

export default SeasickLoader
