const heroku_url_api2 = "https://faircorpapptogzhan.cleverapps.io/api/rooms";

const vm2 = new Vue({
    el: '#app_room',
    data: {
        rooms: [],

    },
    mounted() {
        axios.get(heroku_url_api2)
            .then(response => {this.rooms = response.data});
    }
});
