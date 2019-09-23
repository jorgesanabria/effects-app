import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { CargarUsuario } from '../../store/actions/usuario.actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  loading: boolean;
  error: any;
  user: Usuario;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        // tslint:disable-next-line:no-string-literal
        const id = params['id'];
        this.store.dispatch(new CargarUsuario(id));
      });
    this.store.select('usuario').subscribe(state => {
      this.user = state.user;
      this.loading = state.loading;
      this.error = state.error;
    });
  }

}
