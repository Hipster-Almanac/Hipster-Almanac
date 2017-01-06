import template from './house-chart.html';
import Chart from 'chart.js';

export default {
    template,
    bindings: {
        house: '<'
    }, 
    controller
};

function controller() {

    this.$onInit = () => {

        this.sumChoreTargets = this.house.chores.reduce((acc, curr) => {
            if (curr.target) return acc += parseInt(curr.target);  
            else return acc;
        }, 0);

        this.sumHouseCompleted = this.house.chores.reduce((acc, curr) => {
            if (curr.completed && curr.completed['Jan 2017']) return acc += parseInt(curr.completed['Jan 2017']);  
            else return acc;
        }, 0);

        this.houseChoreNames = this.house.chores.map(chore => chore.name);

        this.renderHousePieChart = () => {
            var sumTargetChart = new Chart('sumTargetChart', { //eslint-disable-line

                type: 'pie',
                data: {
                    labels: ['Completed', 'Remaining'],
                    datasets: [{
                        label: 'Times Completed',
                        data: [this.sumHouseCompleted, this.sumChoreTargets - this.sumHouseCompleted],
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

        this.renderHousePieChart();
       
    };
    
}