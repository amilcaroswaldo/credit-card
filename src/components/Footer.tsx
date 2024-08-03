import React from 'react';
import styles from '../styles/Footer.module.css'; // Asegúrate de crear este archivo CSS

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Prueba tecnica BANK. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;
