import template from './chore-input.html';
import styles from './chore-input.scss';

export default {
    template, 
    controller, 
    bindings: {
        chores: '<',
        user: '<', 
        updateUser: '<',
        id: '<',
        house: '<'
    }
};

controller.$inject = ['userService', 'choreService'];
function controller(User, Chore) {
    this.styles = styles;

    this.enterChore = function() {

        const arr = [];

        for (var key in this.data) {
            if (this.data[key] == true) {
                arr.push(key);                
            }   
        }
        console.log(arr);
        Chore.updateMany(arr);
    };
}