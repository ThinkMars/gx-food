const redis = require('redis');

function redisClient() {
    // const redisClient = redis.createClient(6379, '112.74.52.52', { auth_pass: "223344" });
    const redisClient = redis.createClient(6379, "127.0.0.1");
    redisClient.on("ready", function (res) {
        console.log("ready")
    })
    redisClient.on("error", function (error) {
        console.error(error);
    });
    return redisClient
}

module.exports.redisClient = redisClient