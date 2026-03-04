import { motion } from 'framer-motion';

export const Skeleton = ({ className = '' }) => {
  return (
    <motion.div
      className={`rounded bg-[#1E1E2E] ${className}`}
      animate={{ background: ['#1E1E2E', '#2D2D4E', '#1E1E2E'] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
    />
  );
};