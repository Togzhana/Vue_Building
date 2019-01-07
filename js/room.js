const spring_api_room = "https://faircorp-app-ce.cleverapps.io/api/rooms";

const vm2 = new Vue({
    el: '#app_room',
    data: {
        rooms: [],

    },
    mounted() {
        axios.get(spring_api_room)
            .then(response => {this.rooms = response.data});
    }
});
