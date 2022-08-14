(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["child-routes-module"],{

/***/ "E5tf":
/*!**********************************************!*\
  !*** ./src/app/pages/child-routes.module.ts ***!
  \**********************************************/
/*! exports provided: ChildRoutesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChildRoutesModule", function() { return ChildRoutesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "U5Cf");
/* harmony import */ var _account_settings_account_settings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./account-settings/account-settings.component */ "SxNo");
/* harmony import */ var _busqueda_busqueda_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./busqueda/busqueda.component */ "n7N3");
/* harmony import */ var _grafica1_grafica1_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./grafica1/grafica1.component */ "XHMk");
/* harmony import */ var _perfil_perfil_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./perfil/perfil.component */ "RG4u");
/* harmony import */ var _mantenimientos_hospitales_hospitales_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mantenimientos/hospitales/hospitales.component */ "+a8t");
/* harmony import */ var _mantenimientos_medicos_medicos_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mantenimientos/medicos/medicos.component */ "m3Lg");
/* harmony import */ var _mantenimientos_medicos_medico_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mantenimientos/medicos/medico.component */ "YSFb");
/* harmony import */ var _mantenimientos_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mantenimientos/usuarios/usuarios.component */ "U8Pk");
/* harmony import */ var _guards_admin_guard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../guards/admin.guard */ "Tk1w");







// Mantenimientos




// Guards



const childRoutes = [
    { path: '', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__["DashboardComponent"], data: { titulo: 'Dashboard' } },
    { path: 'account-settings', component: _account_settings_account_settings_component__WEBPACK_IMPORTED_MODULE_3__["AccountSettingsComponent"], data: { titulo: 'Tema' } },
    { path: 'buscar/:termino', component: _busqueda_busqueda_component__WEBPACK_IMPORTED_MODULE_4__["BusquedaComponent"], data: { titulo: 'Busqueda' } },
    { path: 'grafica1', component: _grafica1_grafica1_component__WEBPACK_IMPORTED_MODULE_5__["Grafica1Component"], data: { titulo: 'Grafica' } },
    { path: 'perfil', component: _perfil_perfil_component__WEBPACK_IMPORTED_MODULE_6__["PerfilComponent"], data: { titulo: 'Perfil' } },
    // { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
    // { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
    // { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
    // Mantenimientos
    { path: 'hospitales', component: _mantenimientos_hospitales_hospitales_component__WEBPACK_IMPORTED_MODULE_7__["HospitalesComponent"], data: { titulo: 'hospitales' } },
    { path: 'medicos', component: _mantenimientos_medicos_medicos_component__WEBPACK_IMPORTED_MODULE_8__["MedicosComponent"], data: { titulo: 'medicos' } },
    { path: 'medico/:id', component: _mantenimientos_medicos_medico_component__WEBPACK_IMPORTED_MODULE_9__["MedicoComponent"], data: { titulo: 'medicos' } },
    // Rutas de Admin
    {
        path: 'usuarios',
        canActivate: [_guards_admin_guard__WEBPACK_IMPORTED_MODULE_11__["AdminGuard"]],
        component: _mantenimientos_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_10__["UsuariosComponent"],
        data: { titulo: 'usuarios' }
    },
];
class ChildRoutesModule {
}
ChildRoutesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ChildRoutesModule });
ChildRoutesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ChildRoutesModule_Factory(t) { return new (t || ChildRoutesModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(childRoutes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ChildRoutesModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChildRoutesModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(childRoutes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "Tk1w":
/*!***************************************!*\
  !*** ./src/app/guards/admin.guard.ts ***!
  \***************************************/
/*! exports provided: AdminGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminGuard", function() { return AdminGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_usuario_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/usuario.service */ "on2l");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class AdminGuard {
    constructor(usuarioService, router) {
        this.usuarioService = usuarioService;
        this.router = router;
    }
    canActivate(route, state) {
        if (this.usuarioService.role === "ADMIN_ROLE") {
            return true;
        }
        else {
            this.router.navigateByUrl('/dashboard');
            return false;
        }
    }
}
AdminGuard.ɵfac = function AdminGuard_Factory(t) { return new (t || AdminGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_usuario_service__WEBPACK_IMPORTED_MODULE_1__["UsuarioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AdminGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AdminGuard, factory: AdminGuard.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AdminGuard, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _services_usuario_service__WEBPACK_IMPORTED_MODULE_1__["UsuarioService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=child-routes-module.js.map