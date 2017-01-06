import template from './custom-chore.html';

export default {
    template,
    controller,
    bindings: {
        chores: '<',
        user: '<', 
        id: '<',
        add: '<'
    }
};

function controller() {

    this.clearFields = () => {
        this.name = '';
        this.target = '';
        this.description = '';
    };

    this.addChore = () => {
        this.add({
            name: this.name,
            target: this.target,
            description: this.description,
            houseId: this.id
        });
        this.clearFields();
    };
}