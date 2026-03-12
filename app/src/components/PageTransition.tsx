import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.5, ease: 'easeInOut' } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="w-full min-h-screen origin-top -mt-[72px] pt-[72px]"
            >
                {children}
            </motion.div>
            
            {/* Cinematic Fade to Black */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
                exit={{ opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
                className="fixed inset-0 z-[9999] bg-[#050505] pointer-events-none"
            />
        </>
    );
};

export default PageTransition;
