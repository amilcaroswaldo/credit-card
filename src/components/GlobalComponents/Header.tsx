import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Header.module.css'; // Asegúrate de crear este archivo CSS
import Notification from './NotificationComponent';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const handleCloseNotification = () => {
        setError(null);
    };
    const handleOpenpage = () => {
        const clientData = sessionStorage.getItem('clientData');
        if (clientData === null) {
            router.push('/');
            setError('Para seguir con los procesos, seleccione un cliente valido.');
        }
    }

    useEffect(() => {
        const clientData = sessionStorage.getItem('clientData');
        if (clientData === null) {
          router.push('/');
        }
      }, [router]);

    return (
        <div>
            <div className={styles.container}>
                {error && (
                    <Notification
                        message={error}
                        onClose={handleCloseNotification} // Llama a la función cuando se cierra la notificación
                    />
                )}
            </div>
            <header className={styles.header}>
                <h1>Estado de Cuenta de Tarjeta de Crédito</h1>
                <nav>
                    <ul>
                        <li><Link href="/">Clientes</Link></li>
                        <li><Link href="/EstadoCuenta" onClick={() => handleOpenpage()}>Estado de cuenta</Link></li>
                        <li><Link href="/Compras" onClick={() => handleOpenpage()}>Compras</Link></li>
                        <li><Link href="/Pagos" onClick={() => handleOpenpage()}>Pagos</Link></li>
                        <li><Link href="/Transacciones" onClick={() => handleOpenpage()}>Historial de transacciones</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;
