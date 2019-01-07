const heroku_url_api = "https://faircorpapptogzhan.cleverapps.io/api/building";

const vm = new Vue({
    el: '#app_build',
    data: {
        buildings: [],
    },
    mounted() {
        axios.get(heroku_url_api)
            .then(response => {this.buildings = response.data});
    },

});
