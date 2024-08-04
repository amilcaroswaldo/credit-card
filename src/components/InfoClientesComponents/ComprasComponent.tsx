import Notification from '../GlobalComponents/NotificationComponent';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Compras.module.css';
import { GenericResponse, ListResponse, ObjectResponse } from '@/types/response/BaseResponse';;
import { TarjetaResponse } from '@/types/response/InfoClienteResponse';
import { AddTransaccionRequest } from '@/types/request/EstadoCuentaRequest';
import { AddTransaction } from '@/services/EstadoCuentaServices';

const ComprasComponent: React.FC = () => {
    const [formData, setFormData] = useState({
        numeroTarjeta: '',
        descripcion: '',
        monto: '',
        tipoTransaccion: 'compra',
        categoria: 'comida',
    });
    // const [cliente, setCliente] = useState<ClienteResponse>();
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
            const requestCompras: AddTransaccionRequest = {
                numeroTarjeta: tarjeta?.numeroTarjeta!,
                categoria: formData.categoria,
                descripcion: formData.descripcion,
                monto: Number(formData.monto),
                tipoTransaccion: formData.tipoTransaccion
            }
            const responseTransacciones : GenericResponse = await AddTransaction(requestCompras);
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
                    <label htmlFor="descripcion" className={styles.label}>Descripción</label>
                    <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
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
                <div className={styles.formGroup}>
                    <label htmlFor="tipoTransaccion" className={styles.label}>Tipo de Transacción</label>
                    <select
                        id="tipoTransaccion"
                        name="tipoTransaccion"
                        value={formData.tipoTransaccion}
                        onChange={handleInputChange}
                        className={styles.select}
                    >
                        <option value="compra">Compra</option>
                        <option value="pago">Pago</option>
                        <option value="reembolso">Reembolso</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="categoria" className={styles.label}>Categoría</label>
                    <select
                        id="categoria"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleInputChange}
                        className={styles.select}
                    >
                        <option value="comida">Comida</option>
                        <option value="entretenimiento">Entretenimiento</option>
                        <option value="transporte">Transporte</option>
                        <option value="salud">Salud</option>
                    </select>
                </div>
                <button type="submit" className={styles.submitButton}>Guardar Transacción</button>
            </form>
        </div>
    );
};

export default ComprasComponent;