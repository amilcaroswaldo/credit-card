import axios from "axios";

const baseURLEnviroment: string = process.env.NEXT_PUBLIC_API_URL || "";
console.log("Base URL:", baseURLEnviroment);
if (!baseURLEnviroment) {
  throw new Error("La variable de entorno API_URL no está definida");
}
const apiBase = axios.create({
  baseURL: baseURLEnviroment, // Cambia esto a la URL base de tu API
  headers: {
    "Content-Type": "application/json",
  },
});

apiBase.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la API:", error);
    return Promise.reject(error);
  }
);

export default apiBase;
