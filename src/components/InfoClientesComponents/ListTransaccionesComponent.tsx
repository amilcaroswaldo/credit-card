import React, { useEffect, useState } from 'react';
import { ClienteResponse, TarjetaResponse, TransaccionesResponse } from '@/types/response/InfoClienteResponse';
import { GetTransaccionRangeDate } from '@/services/InfoClienteService';
import { ListResponse } from '@/types/response/BaseResponse';
import Notification from '../GlobalComponents/NotificationComponent';
import styles from '@/styles/Cliente.module.css';
import { TransaccionesRequest } from '@/types/request/InfoClienteRequest';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';
import * as XLSX from 'xlsx';
import TransactionComponent from '../GlobalComponents/WebSocket';


const TransaccionesList: React.FC = () => {
    const [cliente, setCliente] = useState<ClienteResponse>();
    const [tarjeta, setTarjeta] = useState<TarjetaResponse>();
    const [transacciones, setTransacciones] = useState<TransaccionesResponse[]>();
    const [error, setError] = useState<string | null>(null);
    const exportToExcel = (transactions: TransaccionesResponse[]) => {
        const worksheet = XLSX.utils.json_to_sheet(transactions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Transacciones');
        XLSX.writeFile(workbook, 'transacciones.xlsx');
    };
    const handleCloseNotification = () => {
        setError(null);
    };
    const fetchCreditcard = async () => {
        try {
            //get data from storage
            const clientDataFromStorage = sessionStorage.getItem('clientData');
            const creditCardDataFromStorage = sessionStorage.getItem('creditCardData');
            const clientData: ClienteResponse = JSON.parse(clientDataFromStorage!);
            const creditCardData: TarjetaResponse = JSON.parse(creditCardDataFromStorage!);
            setTarjeta(creditCardData);
            setCliente(clientData);
            const fchIni = new Date();
            const current = new Date()
            fchIni.setDate(current.getDate() - 30);
            const fchFin = current.toISOString().split('T')[0];
            const fchIniFormat = fchIni.toISOString().split('T')[0];
            const requestTransacciones: TransaccionesRequest = {
                numeroTarjeta: creditCardData.numeroTarjeta!,
                fchInicio: String(fchIniFormat),
                fchFin: String(fchFin)
            }
            const responseTransacciones:
                ListResponse<TransaccionesResponse> = await GetTransaccionRangeDate(requestTransacciones);
            setTransacciones(responseTransacciones.items!);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    };
    useEffect(() => {
        fetchCreditcard();
    }, []);
    return (
        <div className='.container'>
            {error && (
                <Notification
                    message={error}
                    onClose={handleCloseNotification} // Llama a la función cuando se cierra la notificación
                />
            )}
            <h2 style={{ textAlign: 'center' }}>Todas las transacciones de: {cliente?.nombre} </h2>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Fecha</th>
                        <th className={styles.th}>Descripción</th>
                        <th className={styles.th}>Monto</th>
                        <th className={styles.th}>Tipo</th>
                        <th className={styles.th}>Categoría</th>
                        <th className={styles.th}>Número de Tarjeta</th>
                    </tr>
                </thead>
                <tbody>
                    {(Array.isArray(transacciones) && transacciones.length > 0)
                        && (transacciones.map((transaction, index) => (
                            <tr key={index}>
                                <td className={styles.td}>{transaction.fchaTransaccion}</td>
                                <td className={styles.td}>{transaction.descripcion}</td>
                                <td className={styles.td}>${transaction.montoTransaccion?.toFixed(2)}</td>
                                <td className={styles.td}>{transaction.tipoTransaccion}</td>
                                <td className={styles.td}>{transaction.categoria}</td>
                                <td className={styles.td}>{transaction.numeroTarjeta}</td>
                            </tr>
                        )))}
                </tbody>
            </table>
            <button className="export-button" onClick={() => exportToExcel(transacciones!)}>
                Exportar a Excel
            </button>
            <TransactionComponent />
        </div>
    );
}
export default TransaccionesList;