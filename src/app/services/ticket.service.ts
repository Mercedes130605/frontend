import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TicketService {
    
    generarTicketHTML(reserva: any): string {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Ticket Cine - ${reserva.codigo_reserva}</title>
                <style>
                    body {
                        font-family: 'Courier New', monospace;
                        margin: 0;
                        padding: 20px;
                        background: #f5f5f5;
                    }
                    .ticket {
                        max-width: 400px;
                        margin: 0 auto;
                        background: white;
                        border-radius: 10px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                        overflow: hidden;
                    }
                    .header {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-align: center;
                        padding: 20px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .code {
                        font-size: 12px;
                        margin-top: 5px;
                        opacity: 0.9;
                    }
                    .content {
                        padding: 20px;
                    }
                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                        border-bottom: 1px dashed #ddd;
                    }
                    .label {
                        font-weight: bold;
                        color: #666;
                    }
                    .value {
                        color: #333;
                    }
                    .total {
                        font-size: 18px;
                        font-weight: bold;
                        color: #27ae60;
                        text-align: right;
                        margin-top: 15px;
                        padding-top: 10px;
                        border-top: 2px solid #ddd;
                    }
                    .footer {
                        background: #f9f9f9;
                        text-align: center;
                        padding: 15px;
                        font-size: 12px;
                        color: #999;
                    }
                    .qr {
                        text-align: center;
                        font-size: 48px;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="ticket">
                    <div class="header">
                        <h1>🎬 CINETICKET</h1>
                        <div class="code">Código: ${reserva.codigo_reserva}</div>
                    </div>
                    <div class="content">
                        <div class="info-row">
                            <span class="label">Película:</span>
                            <span class="value">${reserva.pelicula}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Sala:</span>
                            <span class="value">${reserva.sala}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Fecha:</span>
                            <span class="value">${reserva.fecha}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Hora:</span>
                            <span class="value">${reserva.hora}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Asiento:</span>
                            <span class="value">${reserva.fila}${reserva.asiento_numero}</span>
                        </div>
                        <div class="qr">🎟️</div>
                        <div class="total">
                            Total: S/ ${reserva.total}
                        </div>
                    </div>
                    <div class="footer">
                        Presenta este ticket en la entrada<br>
                        ¡Disfruta la película!
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    imprimirTicket(reserva: any) {
        const ventana = window.open('', '_blank');
        if (ventana) {
            ventana.document.write(this.generarTicketHTML(reserva));
            ventana.document.close();
            ventana.print();
        }
    }
}