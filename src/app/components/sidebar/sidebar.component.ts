import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/perfil', title: 'Perfil',  icon:'account_circle', class: '' },
    { path: '/admin/mascotas', title: 'Mascotas',  icon:'pets', class: '' },
    { path: '/admin/articulos', title: 'Articulos',  icon:'library_books', class: '' },
    { path: '/admin/consultas-generales', title: 'Consultas Generales',  icon:'record_voice_over', class: '' },
    { path: '/admin/consultas-privadas', title: 'Consultas privadas',  icon:'chat', class: '' },
    { path: '/admin/alertas', title: 'Alertas',  icon: 'report_problem', class: '' },
    { path: '/admin/adopciones', title: 'Adopciones',  icon:'loyalty', class: '' },
    { path: '/admin/citas', title: 'Citas',  icon:'event', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
