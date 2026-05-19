import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    anioActual = new Date().getFullYear();

    redesSociales = [
        { nombre: 'Instagram', url: 'https://www.instagram.com/mercedesromeroweb/', icono: '📷', color: '#E4405F' },
        { nombre: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61586554689664', icono: '📘', color: '#1877F2' },
        { nombre: 'Twitter/X', url: 'https://x.com/RomeroPelis', icono: '🐦', color: '#1DA1F2' }
    ];
}