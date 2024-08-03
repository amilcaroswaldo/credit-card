import React from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css'; // Asegúrate de crear este archivo CSS

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <h1>Estado de Cuenta de Tarjeta de Crédito</h1>
            <nav>
                <ul>
                    <li><Link href="/">Clientes</Link></li>
                    <li><Link href="/transactions">Estado de cuenta</Link></li>
                    <li><Link href="/purchases">Compras</Link></li>
                    <li><Link href="/payments">Pagos</Link></li>                    
                    <li><Link href="/purchases">Historial de transacciones</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
