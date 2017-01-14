import template from './chart.html';
import styles from './chart.scss';

export default {
    template,
    bindings: {
        house: '<'
    }, 
    controller
};

controller.$inject = ['$state'];



function controller($state) {

    this.styles = styles;

    this.chartStyle = 'pie';
    this.selectedChart = 'all';

    this.updateChart = function() {
        const style = this.chartStyle;
        if (this.selectedChore === 'all') {
            $state.go(`charts.all${style}`);
        } else {
            $state.go(`charts.${style}`, {choreId: this.selectedChore});
        }        
    };
}