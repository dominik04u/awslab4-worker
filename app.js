var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
var sqs = new AWS.SQS();
var resizer = require('./actions/rotate');
var InfiniteLoop = require('infinite-loop');
var infLoop = new InfiniteLoop;

infLoop.add(waitMsg, null).setInterval(100).run();

function waitMsg() {
	var params = {
		QueueUrl : 'https://sqs.us-west-2.amazonaws.com/983680736795/AdamskiSQS',
		MaxNumberOfMessages : 1,
		VisibilityTimeout : 30,
		WaitTimeSeconds : 20
	};

	sqs.receiveMessage(params, function (err, data) {
		if (err) {
			console.log("Error: " + err);
		} else {
			var msg = data.Messages || [];
			if (msq.length > 0) {
				var delParams = {
					QueueUrl : 'https://sqs.us-west-2.amazonaws.com/983680736795/AdamskiSQS',
					ReceiptHandle : JSON.parse(JSON.stringify(messages))[0]["ReceiptHandle"]
				};
				sqs.deleteMessage(delParams, function (err, data) {
					if (err) {
						console.log("Error: " + err);
					} else {
						resizer.doResize(msg);
					}
				});
			}
		}
	});
}