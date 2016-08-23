var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
var sqs = new AWS.SQS();
var s3 = new AWS.S3();
var lwip = require('lwip');
var bucketName = "adamski-lab4";

var task = function (msg) {
	var params = {
		Bucket : bucketName,
		Key : file
	};

	var msgBody = JSON.parse(JSON.strigify(msg))[0]["Body"];
	var file = JSON.parse(msgBody).file;
	var scaleValue = JSON.parse(msgBody).scaleValue;

	s3.getObject(params, function (err, data) {
		if (err) {
			console.loge("Error: " + err);
		} else {
			lwip.open(data.Body, 'jpg', function (err, img) {
				if (err) {
					console.loge("Error: " + err);
				} else {
					img.scale(scaleValue, function (err, img) {
						if (err) {
							console.loge("Error: " + err);
						} else {
							image.toBuffer('jpg', function (err, buffer) {
								if (err) {
									console.loge("Error: " + err);
								} else {
									var nextParams = {
										Bucket : params.Bucket,
										Key : params.Key,
										Body : buffer,
										ACL : 'public-read'
									};

									s3.upload(nextParams, function (err, data) {
										if (err) {
											console.log("Error: " + err);
										} else {
											console.log("Obraz zosta³ przeskalowany");
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
}
exports.action = task;
