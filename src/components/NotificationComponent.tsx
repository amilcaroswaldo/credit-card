import React, { useEffect } from 'react';

interface NotificationProps {
    message: string;
    duration?: number; 
    onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, duration = 5000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.(); // Llama a la función de callback si se proporciona
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                backgroundColor: '#f44336',
                color: 'white',
                padding: '20px',
                borderRadius: '4px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
            }}
        >
            {message}
        </div>
    );
};

export default Notification;
