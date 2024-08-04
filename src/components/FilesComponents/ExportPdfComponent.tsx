import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportPdfComponent: React.FC = () => {
    const exportToPDF = () => {
        const input = document.getElementById('export-pdf');
        if (input) {
            html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 190; // Ajusta el ancho de la imagen
                const pageHeight = pdf.internal.pageSize.height;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;

                let position = 0;

                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('estado_cuenta.pdf');
            });
        }
    };

    return (
        <button
            onClick={exportToPDF}
            style={{
                backgroundColor: '#b93811', // Verde
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '10px auto',
                cursor: 'pointer',
                borderRadius: '5px',
                transition: 'background-color 0.3s, transform 0.2s',
                width: '200px', // Ancho fijo
            }}
        >Exportar a PDF</button>
    );
};

export default ExportPdfComponent;