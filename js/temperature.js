const heroku_url_api_4 = "https://faircorp-app-ce.cleverapps.io/api/temperature-sensors";

const vm4 = new Vue({
  el: '#app_temp',
  data: {
    tempSensors: [],
  },

  mounted() {
    axios.get(heroku_url_api_4)
    .then(response => {this.tempSensors = response.data});
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
          this.stompClient.subscribe("/topic/temperature-sensors", res => this.tempSensors = JSON.parse(res.body));
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
