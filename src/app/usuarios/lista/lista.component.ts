import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as usuariosActions from '../../store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  subscription = new Subscription();
  loading = false;
  error: any;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new usuariosActions.CargarUsuarios());
    this.subscription = this.store.select('usuarios').subscribe(x => {
      this.usuarios = x.users;
      this.loading = x.loading;
      this.error = x.error;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
