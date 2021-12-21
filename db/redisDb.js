const { createClient } = require("redis");
global.RD_STATUS = 0;
const rd_client = createClient({
  host:"127.0.0.1",
  port:"6379",
  
});

(async () => {
  await rd_client.connect();
})();

rd_client.on("connect", () => {
  console.log("::> Redis Client Connected");
  RD_STATUS = 1;
});
rd_client.on("ready", () => {
  console.log("::> Redis Client is ready");
  RD_STATUS = 1;
});
rd_client.on("error", (err) => {
  RD_STATUS = 0;
  //console.log('<:: Redis Client Error', err)
});


module.exports={
  rd_status:RD_STATUS,
  rd_client
}


/*const redis = require("ioredis");
const redisConf = {
  port: "6379",
  host: "localhost",
  maxRetriesPerRequest: null
};
const redisClient = new redis(redisConf);

let RD_STATUS = 0;

redisClient.on("error", (err) => {
  //console.log(err);
  RD_STATUS = 0
});


redisClient.on("connect", () => {
  console.log("connected");
  RD_STATUS = 1
});


exports.rd_status = RD_STATUS;
exports.rd_client = redisClient;*/
