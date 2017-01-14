import template from './chore-pie-chart.html';
import Chart from 'chart.js';

export default {
    template,
    bindings: {
        house: '<',
        choreId: '<'
    }, 
    controller
};

function controller() {

    this.$onInit = () => {

        // could do these at once, something like this:
        this.chores = this.house.chores.reduce((acc, chore) => {
            acc[chore._id] = {
                target: chore.target || 0,
                // hard coded date?
                completed: chore.completed['Jan 2017'] || 0
            };
            return acc;
        }, {});

        this.houseChoreNames = this.house.chores.map(chore => chore.name);

        const id = this.choreId;

        // If only one chore, filter for it first.
        var completed = this.choreTargets[id];
        var remaining = 0; 
        if (this.choreTargets[id] - this.houseCompleted[id] >= 0) {
            remaining = this.choreTargets[id] - this.houseCompleted[id];
        }
        let array = [completed, remaining];
        var chorePieChart = new Chart('chorePieChart', { //eslint-disable-line
            type: 'pie',
            data: {
                labels: ['Completed', 'Remaining'],
                datasets: [{
                    label: 'Times Completed',
                    data: array,
                    backgroundColor: [
                        '#B2EBF2',
                        '#B9F6CA',
                    ],
                    borderColor: [
                        '#26C6DA',
                        '#00E676',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    
                }
            }
        }); 
    

        
    };
    
}