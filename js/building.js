const spring_api_building= "https://faircorp-app-ce.cleverapps.io/api/buildings";

const vm = new Vue({
    el: '#app_build',
    data: {
        buildings: [],
    },
    mounted() {
        axios.get(spring_api_building)
            .then(response => {this.buildings = response.data});
    },

});
