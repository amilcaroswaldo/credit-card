import React, { useCallback, useEffect, useState } from 'react';
import styles from '@/styles/EstadoCuenta.module.css';
import { EstadoCuentaRespons } from '@/types/response/EstadoCuentaResponse';
import { ListResponse, ObjectResponse } from '@/types/response/BaseResponse';
import { GetEstadoCuenta } from '@/services/EstadoCuentaServices';
import { NumeroTarjetaRequest } from '@/types/request/EstadoCuentaRequest';
import { ClienteResponse, TarjetaResponse, TransaccionesResponse } from '@/types/response/InfoClienteResponse';
import Notification from '../GlobalComponents/NotificationComponent';
import { TarjetasRequest, TransaccionesRequest } from '@/types/request/InfoClienteRequest';
import { getDataCard, GetTransaccionRangeDate } from '@/services/InfoClienteService';
import ExportPdfComponent from '../FilesComponents/ExportPdfComponent';

const EstadoCuentaComponent: React.FC = () => {
    const [estadoCuenta, setestadoCuenta] = useState<EstadoCuentaRespons>();
    const [cliente, setCliente] = useState<ClienteResponse>();
    const [tarjeta, setTarjeta] = useState<TarjetaResponse>();
    const [transacciones, setTransacciones] = useState<TransaccionesResponse[]>();
    const [error, setError] = useState<string | null>(null);


    const fetchCreditcard = useCallback(async () => {
        try {
            //get data from storage
            const clientDataFromStorage = sessionStorage.getItem('clientData');
            const clientData: ClienteResponse = JSON.parse(clientDataFromStorage!);
            //get data from service tarjeta
            const requestTar: TarjetasRequest = {
                IdCliente: Number(((clientData.clienteId))!)
            };
            const responseTar: ObjectResponse<TarjetaResponse> = await getDataCard(requestTar!);
            //valida si hat datos
            if (responseTar.code === 0) {
                setError(responseTar.message!);
                return;
            }
            //actualizacion estado y add storage
            const creditCardData: TarjetaResponse = responseTar.items!;
            setTarjeta(creditCardData)
            sessionStorage.setItem('creditCardData', JSON.stringify(creditCardData))
            //valida los objetos de entrada para estado de cuenta
            if (creditCardData === null) {
                setError("No se ha obtenido la data de la tarjeta")
                return;
            }
            if (clientData === null) {
                setError("No se ha obtenido la data del cliente")
                return;
            }
            //actualiza estados
            setTarjeta(creditCardData);
            setCliente(clientData);
            //consulta y obtiene data de estado de cuenta
            const request: NumeroTarjetaRequest = { numeroTarjeta: creditCardData.numeroTarjeta! };
            const response: ObjectResponse<EstadoCuentaRespons> = await GetEstadoCuenta(request);
            setestadoCuenta(response.items!);
            //get data de transacciones de los ultimos 30 dias            
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
    }, []);
    useEffect(() => {
        fetchCreditcard();
    }, [fetchCreditcard]);
    const handleCloseNotification = () => {
        setError(null);
    };
    return (
        <div className={styles.container} id='export-pdf'>
            {error && (
                <Notification
                    message={error}
                    onClose={handleCloseNotification} // Llama a la función cuando se cierra la notificación
                />
            )}
            <div className={styles.card}>
                <h2 className={styles.title}>Estado de Cuenta</h2>
                <div className={styles.info}>
                    <div className={styles.item}>
                        <span>Nombre del Titular:</span>
                        <span>{cliente?.nombre}</span>
                    </div>
                    <div className={styles.item}>
                        <span>Número de Tarjeta:</span>
                        <span>{tarjeta?.numeroTarjeta}</span>
                    </div>
                    <div className={styles.item}>
                        <span>Saldo Actual:</span>
                        <span>${estadoCuenta?.saldoActual!.toFixed(2)}</span>
                    </div>
                    <div className={styles.item}>
                        <span>Límite de Crédito:</span>
                        <span>${tarjeta?.limiteCredito!.toFixed(2)}</span>
                    </div>
                    <div className={styles.item}>
                        <span>Saldo Disponible:</span>
                        <span>${estadoCuenta?.saldoDisponible!.toFixed(2)}</span>
                    </div>
                    <div className={styles.item}>
                        <span>Interés Bonificable:</span>
                        <span>${estadoCuenta?.interesBonificable!.toFixed(2)}</span>
                    </div>
                    <div className={styles.item}>
                        <span>Cuota Mínima a Pagar:</span>
                        <span>${estadoCuenta?.cuotaMinima!.toFixed(2)}</span>
                    </div>
                    <div className={styles.item}>
                        <span>Monto Total a Pagar:</span>
                        <span>${estadoCuenta?.montoTotal!.toFixed(2)}</span>
                    </div>
                    <div className={styles.item}>
                        <span>Monto Total de Contado con Intereses:</span>
                        <span>${estadoCuenta?.montoContadoConIntereses!.toFixed(2)}</span>
                    </div>
                    <div className={styles.item}>
                        <span>Monto Total gastos del mes anterior y actual</span>
                        <span>${estadoCuenta?.montoTotalMesActualAnterior!.toFixed(2)}</span>
                    </div>
                </div>
                <h3 style={{textAlign: 'center'}}>Compras Realizadas Este Mes</h3>
                <ul className={styles.purchases}>
                    {(Array.isArray(transacciones) && transacciones.length > 0) && transacciones!.map((t) => (
                        <li key={`${t.fchaTransaccion}-${Math.random()}`} className={styles.purchaseItem}>
                            <span><strong>Monto </strong>{t.montoTransaccion!.toFixed(2)}</span>
                            <span><strong>Fecha </strong>{t.fchaTransaccion}</span>
                            <span><strong>Descripcion </strong>{t.descripcion} {t.categoria}</span>
                        </li>
                    ))}
                </ul>
                <ExportPdfComponent />
            </div>
        </div>
    );
};

export default EstadoCuentaComponent;
