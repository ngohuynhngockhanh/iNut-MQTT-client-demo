

const  mqtt = require('mqtt')
const  explode = require('locutus/php/strings/explode')


var client  = mqtt.connect('mqtt://mqtt.mysmarthome.vn:1883')
 
client.on('connect', function () {
	
	
	
	//đăng ký các node
	client.publish('register', JSON.stringify({
		"node_id":"BJg3q5Yrz",
		"uuid":"BHNOrSlw1qhIHuyWk8SRzS1oncu1",
		"token":"cf91d9b4243c5fa18808fdf3d6e681c3358767364533"
	})) //vì mqtt chỉ gửi chuỗi hoặc buffer nên để thêm hàm Json.stringify để nén json thành string
	
	
	client.subscribe('wait_for_accept')
	//console.log(client)
	
	setTimeout(function() {
		client.subscribe(['node/BJg3q5Yrz'])
	}, 5000)
})
 
client.on('message', function (topic, message) {
  // message is Buffer
	if (topic == "wait_for_accept") {
		var json = JSON.parse(message)
		var node_id = json.node_id
		var uuid = json.uuid 
		console.log("Accept", node_id, "from", uuid)
		client.subscribe('node/' + node_id) //đăng ký lắng nghe
	}
	
	//bắt các sự kiện của node theo topic dạng node/<node_id>
	//các bạn có thể code thêm ở đây
	var paths = explode('/', topic)
	if (paths[0] == 'node') {
		var devices = JSON.parse(message)
		var node_id = paths[1]
		console.log(node_id, devices)
	}
})
