from sqlmodel import Session

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from app.logic.productos_logic import ver_top3
from datetime import datetime
import os


async def generar_reporte(session: Session):
    """
    Lógica para generar un reporte PDF con los 3 productos más vendidos.

    :param session: La dependencia de la sesión.
    :type session: Session
    :return: Un diccionario con la ruta del reporte generado.
    """
    # Obtener los 3 productos más vendidos
    top_productos = await ver_top3(session)

    # Crear el directorio reports si no existe
    reports_dir = "reports"
    if not os.path.exists(reports_dir):
        os.makedirs(reports_dir)

    # Generar nombre único para el reporte
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{reports_dir}/top_productos_{timestamp}.pdf"

    # Crear el documento PDF
    doc = SimpleDocTemplate(filename, pagesize=letter)
    styles = getSampleStyleSheet()
    elements = []

    # Título del reporte
    title = Paragraph("Top 3 Productos Más Vendidos", styles["Title"])
    elements.append(title)

    # Crear la tabla con los datos
    data = [["Nombre", "Precio unitario con iva", "Cantidad vendida", "Ventas totales"]]
    for item in top_productos:
        data.append(
            [
                item.nombre,
                f"${item.precio_con_iva:.2f}",
                str(item.cantidad),
                f"${item.valor_total_con_iva:.2f}",
            ]
        )

    # Estilo de la tabla
    table = Table(data)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 14),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
                ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
                ("TEXTCOLOR", (0, 1), (-1, -1), colors.black),
                ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 1), (-1, -1), 12),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("GRID", (0, 0), (-1, -1), 1, colors.black),
            ]
        )
    )
    elements.append(table)

    # Generar el PDF
    doc.build(elements)

    return {"filename": filename}
