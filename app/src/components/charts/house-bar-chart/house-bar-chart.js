import template from './house-bar-chart.html';
import Chart from 'chart.js';

export default {
    template,
    bindings: {
        house: '<',
        choreId: '<'
    }, 
    controller
};

// controller.$inject = ['$element'];

function controller() {

    this.$onInit = () => {
        var getChoreAmounts = (id, arr) =>  {
            return arr.map(user => {
                if (user.choreUnits.length) {
                    for (var i = 0; i < user.choreUnits.length; i++) {
                        if (user.choreUnits[i].choreId === id && user.choreUnits[i].completed) {
                            return user.choreUnits[i].completed['Jan 2017'] || 0;
                        } else return 0;    
                    }
                } else return 0;

            });
        };

        var userNames = this.house.users.map(user => user.username);

        this.renderHouseBarChart = (id) => {
            var data = getChoreAmounts(id, this.house.users);
            console.log(data);
            var houseBarChart = new Chart('houseBarChart', {//eslint-disable-line
                type: 'bar',
                data: {
                    labels: userNames,
                    datasets: [{
                        label: 'Times Completed',
                        data: data,
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

        this.renderHouseBarChart(this.choreId);

        
    };
    
}