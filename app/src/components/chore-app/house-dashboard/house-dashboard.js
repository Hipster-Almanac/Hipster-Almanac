import template from './house-dashboard.html';
import styles from './house-dashboard.scss';

export default {
    template,
    controller, 
    bindings: {
        chores: '<',
        id: '<',
        house: '<', 
        user: '<',
        updateUser: '<'
    }
};

controller.$inject = ['choreService'];

function controller(choreService) {
    this.styles = styles;

    this.add = chore => {
        choreService.add(chore)
            .then(saved => this.house.chores.push(saved))
            .catch(err => console.log(err));
    };
}
