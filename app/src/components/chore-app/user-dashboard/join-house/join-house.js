import template from './join-house.html';

export default {
    template,
    controller,
    bindings: {
        user: '<',
        house: '<'
    }
};

controller.$inject = ['houseService', '$state'];

function controller(houseService, $state) {
    this.reset = () => {
        this.name = '';
        this.code = '';
    };

    this.joinHouse = () => {
        houseService.join({name: this.name, code: this.code});
        this.reset();
        $state.go('houseDashboard');
    };
}