import { createClient } from "redis";

export const client = createClient({
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

export async function setUserPendingRequest({
  email,
  userEmail,
}: {
  email: string;
  userEmail: string;
}) {
  
}

export async function getUserPendingRequest(userEmail: string) {
  let pendingFriendRequest = await client.HGETALL(
    `user:${userEmail}:pending:friend`
  );
  const data = Object.keys(pendingFriendRequest);
  let userInfo = [];
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      let user = await client.HGETALL(`user:${data[i]}`);
      if (user) {
        userInfo.push({
          ...user,
          email: data[i],
        });
      }
    }
    return userInfo;
  } else {
    return null;
  }
}

export async function getUserDashboard({ userEmail }: { userEmail: string }) {
  const pendingFriendLength = await client.HLEN(
    `user:${userEmail}:pending:friend`
  );
  const friendlist = await client.HGETALL(`user:${userEmail}:friendlist`);
  const friendlistKey = Object.keys(friendlist);
  let friendArr = [];
  for (let i = 0; i < friendlistKey.length; i++) {
    const data = await client.HGETALL(`user:${friendlistKey[i]}`);

    friendArr.push({
      ...data,
      email: friendlistKey[i],
    });
  }

  return {
    pendingFriendLength,
    friendlist: friendArr,
  };
}

const getUserFriends = async (key: string) => {
  let data = await client.SMEMBERS(key);
  let userInfo = [];
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      let user = await client.HGETALL(`user:${data[i]}`);
      if (user) {
        userInfo.push({
          ...user,
          email: data[i],
        });
      }
    }
    return userInfo;
  } else {
    return null;
  }
};

const addUserToFriend = async (userEmail: string, friendEmail: string) => {
  const chatId = Math.floor(Math.random() * Date.now()).toString();
  const user = await client.HSET(
    `user:${userEmail}:friendlist`,
    friendEmail,
    chatId
  );
  const friend = await client.HSET(
    `user:${friendEmail}:friendlist`,
    userEmail,
    chatId
  );
  const isDeletedFromPendingRequest = await client.HDEL(
    `user:${userEmail}:pending:friend`,
    friendEmail
  );
  if (!user || !friend || !isDeletedFromPendingRequest) {
    return null;
  }
  return true;
};

export async function removeUserFromPendingRequest(
  userEmail: string,
  friendEmail: string
) {
  await client.HDEL(`user:${userEmail}:pending:friend`, friendEmail);
}

export async function getUserPendingRequestLength(userEmail: string) {
  return await client.HLEN(`user:${userEmail}:pending:friend`);
}

export { setUserHash, getUserHash, addUserToFriend, getUserFriends };

// export async function addUserPendingRequest(){
//   // const res = await client.
// }
