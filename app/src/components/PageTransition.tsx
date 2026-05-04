import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const location = useLocation();
    
    // Determine the overlay color based on the destination path
    // Dark paths get a black overlay, light paths get a white overlay
    const isDarkPath = ['/pavi-top-stars', '/i-edicion'].some(p => 
        location.pathname === p || location.pathname.startsWith(p + '/')
    );

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="w-full min-h-screen origin-top"
            >
                {children}
            </motion.div>
            
            {/* Cinematic Fade that matches the page color */}
            <motion.div
                key={location.pathname + "-overlay"}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
                exit={{ opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } }}
                className={`fixed inset-0 z-[9999] pointer-events-none ${isDarkPath ? 'bg-[#050505]' : 'bg-white'}`}
            />
        </>
    );
};

export default PageTransition;
