import angular from 'angular';
import components from './components';
import services from './services';
import './scss/main.scss';
//third party 
import animate from 'angular-animate';
import defaultRoute from 'angular-ui-router-default';
import uiRouter from 'angular-ui-router';
import resource from 'angular-resource';
import 'angular-ui-router/release/stateEvents';

import dialog from 'ng-dialog';
import 'ng-dialog/css/ngDialog.css';
import 'ng-dialog/css/ngDialog-theme-default.css';

//route, http config and auth setup
import http from './http';
import routes  from './routes';
import auth from './auth';
import ngMaterial from 'angular-material';
import 'angular-material/angular-material.css';
import ngAria from 'angular-aria';

const app = angular.module('myApp', [
    components,
    services,
    uiRouter,
    defaultRoute,
    ngMaterial, 
    ngAria,
    angular.module('ui.router.state.events').name,
    resource,
    dialog,
    animate,
]);

app.config(http);
app.config(routes);
app.run(auth);
app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('cyan')
        .accentPalette('green');
}); 

const dev = 'http://localhost:3000/api';

app.value('apiUrl', dev);