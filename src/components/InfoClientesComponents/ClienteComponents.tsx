import React, { useEffect, useState } from 'react';
import { ClienteResponse } from '@/types/response/InfoClienteResponse';
import { getClients } from '@/services/InfoClienteService';
import { ListResponse } from '@/types/response/BaseResponse';
import Notification from '../NotificationComponent';

const ClientList: React.FC = () => {
    const [selectedClient, setSelectedClient] = useState<ClienteResponse | null>(null);
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
    useEffect(() => {
        fetchClients();
    }, []);
    const handleClientClick = (client: ClienteResponse) => {
        setSelectedClient(client);
    };
    const handleCloseNotification = () => {
        setError(null);
    };
    return (
        <div>
            <h2>Lista de Clientes</h2>
            {error && (
                <Notification
                    message={error}
                    onClose={handleCloseNotification} // Llama a la función cuando se cierra la notificación
                />
            )}
            <ul>
                {clients.map(client => (
                    <li key={client.clienteId} onClick={() => handleClientClick(client)}>
                        {client.numeroIdentidad} - {client.nombre}
                    </li>
                ))}
            </ul>

            {selectedClient && (
                <div>
                    <h3>Detalles del Cliente</h3>
                    <p><strong>ID:</strong> {selectedClient.clienteId}</p>
                    <p><strong>Nombre:</strong> {selectedClient.nombre}</p>
                    <p><strong>Número de Identidad:</strong> {selectedClient.numeroIdentidad}</p>
                    <p><strong>Dirección:</strong> {selectedClient.direccion}</p>
                    <p><strong>Teléfono:</strong> {selectedClient.telefono}</p>
                    <p><strong>Email:</strong> {selectedClient.email}</p>
                </div>
            )}
        </div>
    );
};

export default ClientList;
