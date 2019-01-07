const spring_api_light = "https://faircorp-app-ce.cleverapps.io/api/lights";

const vm3 = new Vue({
  el: '#app_light',
  data: {
    lights: [],
  //  selectedLight: 0
    connected:false
  },
  mounted() {
    axios.get(spring_api_light)
    .then(response => {this.lights = response.data});
    this.connect();
  },
  beforeDestroy(){
    this.disconnect();
  },

  methods: {
    switchLight(light) {
      //this.selectedLight = light;
      let post_url3 = spring_api_light + "/" + light.id+"/switch";
      //  console.info(lightId);
      //{lightId: light.id}
      axios.put(post_url3)
      .then(this.getLights);
    },

    connect() {
      this.socket = new SockJS("https://faircorp-app-ce.cleverapps.io/websockets");
      this.stompClient = webstomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
          /* eslint-disable-next-line no-console */
          console.log('Connected: ' + frame);
          this.stompClient.subscribe("/topic/lights", res => this.lights = JSON.parse(res.body));
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
