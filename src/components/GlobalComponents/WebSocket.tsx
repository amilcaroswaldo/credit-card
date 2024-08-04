import { useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
const baseURLEnviroment: string = process.env.NEXT_PUBLIC_API_URL || "";
console.log("Base URL:", baseURLEnviroment);
if (!baseURLEnviroment) {
  throw new Error("La variable de entorno API_URL no está definida");
}
const TransactionComponent = () => {
    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(baseURLEnviroment+"/transactionHub")
            .build();

        connection.on("ReceiveTransaction", (transaction) => {
            console.log("Nueva transacción recibida:", transaction);
        });

        connection.start()
            .then(() => console.log("Conectado a SignalR"))
            .catch(err => console.error("Error al conectar a SignalR:", err));

        return () => {
            connection.stop();
        };
    }, []);

    return (
        <div>
            <h1>Transacciones en Tiempo Real</h1>
            {/* Aquí puedes mostrar las transacciones */}
        </div>
    );
};

export default TransactionComponent;