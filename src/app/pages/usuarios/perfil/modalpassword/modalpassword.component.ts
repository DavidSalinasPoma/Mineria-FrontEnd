import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modalpassword',
  templateUrl: './modalpassword.component.html',
  styleUrls: ['./modalpassword.component.css']
})
export class ModalpasswordComponent implements OnInit {

  @Output() cerrarModal: EventEmitter<any> = new EventEmitter();
  @Input() titulo!: string;
  @Input() mensaje!: string;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * cerrar
   */
  public cerrar() {
    // Emite un evento para indicar que el modal debe cerrarse
    // Puedes suscribirte a este evento en el componente padre para cerrar el modal
    this.cerrarModal.emit();
  }
}
