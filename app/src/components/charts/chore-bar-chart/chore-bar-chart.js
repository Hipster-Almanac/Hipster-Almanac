import template from './chore-bar-chart.html';
import Chart from 'chart.js';

export default {
    template,
    bindings: {
        house: '<'
    }, 
    controller
};

// controller.$inject = ['$element'];

function controller() {

    this.$onInit = () => {

        

        // the house target for each chore & name
        // the house target for all chores & name

        // the user total for each chore for Jan 17 & name
        // the user total for all chores for Jan 17 & name
        // let houseChores = this.house.chores.reduce((acc, curr) => {
        //     var id = curr._id;
        //     if (curr.name) {
        //         return acc[id] = curr.name;
        //     }
        //     else return null;
        // }, {});;

        this.choreTargets = this.house.chores.map(chore => {
            return chore.target;
        });
        this.sumChoreTargets = this.house.chores.reduce((acc, curr) => {
            if (curr.target) return acc += parseInt(curr.target);  
            else return acc;
        }, 0);

        this.houseCompleted = this.house.chores.map(chore => {
            if (!chore.completed) return null;
            return chore.completed['Jan 2017'];
        });

        this.sumHouseCompleted = this.house.chores.reduce((acc, curr) => {
            if (curr.completed && curr.completed['Jan 2017']) return acc += parseInt(curr.completed['Jan 2017']);  
            else return acc;
        }, 0);

        function getChoreAmounts(arr) {
            return arr.map(user => {
                if (user.choreUnits.length) {
                    return user.choreUnits.reduce((acc, curr) => {
                        if (curr.completed && curr.completed['Jan 2017']) {
                            acc += curr.completed['Jan 2017'];
                        } 
                        return acc;
                    }, 0);
                } else return 0;

            });
        }

        var userNames = this.house.users.map(user => user.username);
        this.houseChoreNames = this.house.chores.map(chore => chore.name);

        

        this.renderChoreBarChart = () => {
            var chores =  getChoreAmounts(this.house.users);
        
            var choreBarChart = new Chart('choreBarChart', { //eslint-disable-line
                type: 'bar',
                data: {
                    labels: userNames,
                    datasets: [{
                        label: 'Times Completed',
                        data: chores,
                        backgroundColor: '#B2EBF2',
                        borderColor: '#26C6DA',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        
                    }
                }
            });

        };

        this.renderChoreBarChart();
        
    };
    
}