

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import * as fromActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {
    constructor(private actions$: Actions,
                private usuariosService: UsuarioService) {}

    @Effect()
    cargarUsuario$ = createEffect(() => this.actions$.pipe(ofType(fromActions.CARGAR_USUARIO)))
        .pipe(
            switchMap((action: fromActions.CargarUsuario) => {
                console.log(action);
                return this.usuariosService.getUserById(action.id)
                    .pipe(
                        map(user => {
                            return new fromActions.CargarUsuarioSuccess(user);
                        }),
                        catchError(error => of(new fromActions.CargarUsuarioFail(error)))
                    );
            })
        );
}
