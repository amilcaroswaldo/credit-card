import Notification from '../GlobalComponents/NotificationComponent';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Compras.module.css';
import { GenericResponse, ListResponse, ObjectResponse } from '@/types/response/BaseResponse';;
import { TarjetaResponse } from '@/types/response/InfoClienteResponse';
import {  AddpagoRequest, AddTransaccionRequest } from '@/types/request/EstadoCuentaRequest';
import { AddPago, AddTransaction } from '@/services/EstadoCuentaServices';

const PagosComponent: React.FC = () => {
    const [formData, setFormData] = useState({
        numeroTarjeta: '',
        monto: ''
    });
    const [tarjeta, setTarjeta] = useState<TarjetaResponse>();
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        try {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            if (name === 'monto' && parseFloat(value) <= 0) {
                const cleanedValue = value.replace(/\D/g, '');
                setFormData({ ...formData, [name]: cleanedValue });
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const requestCompras: AddpagoRequest = {
                numeroTarjeta: tarjeta?.numeroTarjeta!,
                monto: Number(formData.monto),
            }
            const responseTransacciones : GenericResponse = await AddPago(requestCompras);
            if (responseTransacciones.code! !== 0) {
                setError("se ha hecho la compra")
            }
            else{
                setError("No se ha podido agregar la transaccion")
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    };
    const loadData = async () => {
        try {
            const creditCardFromStorage = sessionStorage.getItem('creditCardData');
            const creditCardData: TarjetaResponse = JSON.parse(creditCardFromStorage!);
            setTarjeta(creditCardData!)
            console.log(creditCardData);
            console.log(formData);   
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    }
    const handleCloseNotification = () => {
        setError(null);
    };
    useEffect(() => {
        loadData();
    }, []);
    return (
        <div className={styles.container}>
            {error && (
                <Notification
                    message={error}
                    onClose={handleCloseNotification} // Llama a la función cuando se cierra la notificación
                />
            )}
            <h2 className={styles.formTitle}>Agregar Nueva Transacción</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="numeroTarjeta" className={styles.label}>Número de Tarjeta</label>
                    <input
                        type="text"
                        id="numeroTarjeta"
                        name="numeroTarjeta"
                        value={tarjeta?.numeroTarjeta}
                        disabled
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="monto" className={styles.label}>Monto</label>
                    <input
                        type="number"
                        id="monto"
                        name="monto"
                        value={formData.monto}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                    />
                </div>            
                <button type="submit" className={styles.submitButton}>Guardar Transacción</button>
            </form>
        </div>
    );
};

export default PagosComponent;