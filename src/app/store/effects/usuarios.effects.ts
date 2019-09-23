import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import * as fromActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {
    constructor(private actions$: Actions,
                private usuariosService: UsuarioService) {}

    @Effect()
    cargarUsuarios$ = createEffect(() => this.actions$.pipe(ofType(fromActions.CARGAR_USUARIOS)))
        .pipe(
            switchMap(() => {
                return this.usuariosService.getUsers()
                    .pipe(
                        map(users => {
                            return new fromActions.CargarUsuariosSuccess(users);
                        }),
                        catchError(error => of(new fromActions.CargarUsuariosFail(error)))
                    );
            })
        );
}
