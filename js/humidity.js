const heroku_url_api_5 = "https://faircorp-app-ce.cleverapps.io/api/humidity-sensors";

const vm5 = new Vue({
  el: '#app_hum',
  data: {
    hmdtSensors: [],
  },

  mounted() {
    axios.get(heroku_url_api_5)
    .then(response => {this.hmdtSensors = response.data});
    this.connect();
  },
  beforeDestroy(){
    this.disconnect();
  },

  methods: {

    connect() {
      this.socket = new SockJS("https://faircorp-app-ce.cleverapps.io/websockets");
      this.stompClient = webstomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
          /* eslint-disable-next-line no-console */
          console.log('Connected: ' + frame);
          this.stompClient.subscribe("/topic/humidity-sensors", res => this.hmdtSensors = JSON.parse(res.body));
        },
        error => {
          /* eslint-disable-next-line no-console */
          console.log(error);
          this.connected = false;
        }
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    }
  }
  /*
  getLights: function(){
  axios.get(heroku_url_api_3)
  .then(response=>{this.lights=response.data})
}
*/

});
