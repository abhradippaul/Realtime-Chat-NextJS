import { createClient } from "redis";

const client = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

// const client = createClient({
//   password: "Abhradip8910",
//   socket: {
//     host: "redis-14040.c212.ap-south-1-1.ec2.cloud.redislabs.com",
//     port: 14040,
//   },
// });
client.on("error", (err) => {
  console.log("The redis error is ", err);
});

if (!client.isOpen) {
  client.connect();
}

const setUserHash = async (key: string, field: string, value: string) => {
  await client.HSET(key, field, value);
  console.log("value set successfully");
};

const getUserHash = async (key: string) => {
  let data = await client.HGETALL(key);
  if (data.name && data.image) {
    return data;
  } else {
    return null;
  }
};

const setUserFriend = async (key: string, value: string) => {
  // console.log(key,value);
  const isFriend = await client.SISMEMBER(key, value);
  if (isFriend) {
    return true;
  } else {
    await client.SADD(key, value);
    return false;
  }
};

const getUserPendingRequest = async (Key: string) => {
  let data = await client.SMEMBERS(Key);
  let userInfo = []
  if(data.length) {
    for(let i = 0; i < data.length; i++) {
      let user = await client.HGETALL(`user:${data[i]}`);
      if(user) {
        userInfo.push({
          ...user,
          email: data[i],
        })
      }
    }
    return userInfo
  } else {
    return null
  }
};

export { setUserHash, getUserHash, setUserFriend, getUserPendingRequest };
