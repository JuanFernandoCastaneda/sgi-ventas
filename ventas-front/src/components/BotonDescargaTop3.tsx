import { useState } from "react";

export const BotonDescargaTop3: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <button
      onClick={async () => {
        try {
          setIsDownloading(true);
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_IP}/reportes`,
            {
              method: "GET",
            }
          );
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `reporte-ordenes-${
            new Date().toISOString().split("T")[0]
          }.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } catch (error) {
          console.error("Error al descargar el reporte:", error);
        } finally {
          setIsDownloading(false);
        }
      }}
      className="py-1 px-2 outline-2 text-font-gray rounded-md outline-font-hover-purple hover:bg-font-hover-purple hover:text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isDownloading}
    >
      {isDownloading ? "Descargando..." : "Descargar Reporte"}
    </button>
  );
};
