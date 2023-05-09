import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

// Utilizando jquery
declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-modalusuarioregister',
  templateUrl: './modalusuarioregister.component.html',
  styleUrls: ['./modalusuarioregister.component.css']
})
export class ModalusuarioregisterComponent implements OnInit {

  @Output() cerrarModal: EventEmitter<any> = new EventEmitter();
  @Input() titulo!: string;
  @Input() mensaje!: string;

  public data!: any[];

  constructor() { }

  ngOnInit(): void { }

  /**
   * cerrar
   */
  public cerrar() {
    // Emite un evento para indicar que el modal debe cerrarse
    // Puedes suscribirte a este evento en el componente padre para cerrar el modal
    this.cerrarModal.emit();
  }
}
