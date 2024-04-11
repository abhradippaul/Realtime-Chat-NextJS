import { createClient } from "redis";

// const client = createClient({
//   socket: {
//     host: "localhost",
//     port: 6379,
//   },
// });

const client = createClient({
  password: "Abhradip8910",
  socket: {
    host: "redis-14040.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 14040,
  },
});
client.on("error", (err) => {
  console.log("The redis error is ", err);
});

if (!client.isOpen) {
  client.connect();
}

const setHash = async (key: string, field: string, value: string) => {
  await client.HSET(key, field, value);
  console.log("value set successfully");
};

const getHash = async (key: string) => {
  let data = await client.HGETALL(key);
  if (data.name && data.image) {
    return data;
  } else {
    return null;
  }
};

export { setHash, getHash };
