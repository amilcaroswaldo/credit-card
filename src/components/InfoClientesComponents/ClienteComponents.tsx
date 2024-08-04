import React, { useCallback, useEffect, useState } from 'react';
import { ClienteResponse, TarjetaResponse } from '@/types/response/InfoClienteResponse';
import { getClients, getDataCard } from '@/services/InfoClienteService';
import { ListResponse, ObjectResponse } from '@/types/response/BaseResponse';
import Notification from '../GlobalComponents/NotificationComponent';
import styles from '@/styles/Cliente.module.css';
import { TarjetasRequest } from '@/types/request/InfoClienteRequest';


const ClientList: React.FC = () => {
    const [selectedClient, setSelectedClient] = useState<ClienteResponse | null>(null);
    const [tarjeta, setTarjeta] = useState<TarjetaResponse | null>(null);
    const [clients, setClients] = useState<ClienteResponse[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchClients = async () => {
        try {
            const response: ListResponse<ClienteResponse> = await getClients();
            setClients(response.items!);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    };
    const fetchCreditcard = async (clienteRes: ClienteResponse) => {
        try {
            const request: TarjetasRequest = {
                IdCliente: Number(((clienteRes.clienteId))!)
            };
            const response: ObjectResponse<TarjetaResponse> = await getDataCard(request!);
            if (response.code === 0) {
                setError(response.message!);
                sessionStorage.clear();
                return;
            }
            setTarjeta(response.items!);
            sessionStorage.setItem('clientData', JSON.stringify(clienteRes))
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    };

    const handleClientClick = async (client: ClienteResponse) => {
        try {
            const clienteRes = await Promise.resolve(clients.filter(c => c.clienteId === client.clienteId)[0]);
            fetchCreditcard(clienteRes!);
            setSelectedClient(client);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        }
    };

    const handleCloseNotification = () => {
        setError(null);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div className={styles.container}>
            <h2 style={{ textAlign: 'center' }}>Seleccionar Cliente para comenzar procesos...</h2>
            <div className={styles.row}>
                <div className={styles.container_table}>
                    {error && (
                        <Notification
                            message={error}
                            onClose={handleCloseNotification} // Llama a la función cuando se cierra la notificación
                        />
                    )}
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tr}>
                                <th className={styles.th}>Seleccionar</th>
                                <th className={styles.th}>Nombre</th>
                                <th className={styles.th}>Numero Identidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(cliente => (
                                <tr key={cliente.clienteId} className={styles.td}>
                                    <td className={styles.checkbox_container}>
                                        <input
                                            type="checkbox"
                                            className={styles.checkbox}
                                            checked={selectedClient?.clienteId === cliente.clienteId}
                                            onChange={() => handleClientClick(cliente)}
                                        />
                                    </td>
                                    <td className={styles.td}>{cliente.nombre}</td>
                                    <td className={styles.td}>{cliente.numeroIdentidad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedClient && (
                    <div className={styles.container_cards}>
                        <div className={styles.details}>
                            <h3>Detalles del Cliente</h3>
                            <p><strong>ID:</strong> {selectedClient.clienteId}</p>
                            <p><strong>Nombre:</strong> {selectedClient.nombre}</p>
                            <p><strong>Número de Identidad:</strong> {selectedClient.numeroIdentidad}</p>
                            <p><strong>Dirección:</strong> {selectedClient.direccion}</p>
                            <p><strong>Teléfono:</strong> {selectedClient.telefono}</p>
                            <p><strong>Email:</strong> {selectedClient.email}</p>
                        </div>
                        <div className={styles.additionalInfo}>
                            <div className={styles.flagOrCard}>
                                <div className={styles.flag}>
                                    <p>Detalle de clientes</p>
                                </div>
                                <p className={styles.accountStatusInfo}>
                                    si tiene tarjeta. Puede ver los estados de cuentas de este cliente haciendo clic en el botón correspondiente.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientList;
