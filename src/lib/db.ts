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

export async function setUserPendingRequest({
  email,
  userEmail,
}: {
  email: string;
  userEmail: string;
}) {
  const isPending = await client.HEXISTS(
    `user:${userEmail}:pending:friend`,
    email
  );
  const isAccepted = await client.HEXISTS(
    `user:${userEmail}:friendlist`,
    email
  );
  if (isPending || isAccepted) {
    return true;
  } else {
    await client.HSET(`user:${email}:pending:friend`, userEmail, "");
    return false;
  }
}

// const getUserPendingRequest = async (Key: string) => {
//   let data = await client.SMEMBERS(Key);
//   let userInfo = [];
//   if (data.length) {
//     for (let i = 0; i < data.length; i++) {
//       let user = await client.HGETALL(`user:${data[i]}`);
//       if (user) {
//         userInfo.push({
//           ...user,
//           email: data[i],
//         });
//       }
//     }
//     return userInfo;
//   } else {
//     return null;
//   }
// };

export async function getUserDashboard({ userEmail }: { userEmail: string }) {
  const pendingResponse = await client.HGETALL(
    `user:${userEmail}:pending:friend`
  );
  const friendlist = await client.HGETALL(`user:${userEmail}:friendlist`);
  const pendingResponseKey = Object.keys(pendingResponse);
  const friendlistKey = Object.keys(friendlist);
  let friendArr = [];
  let pendingArr = [];
  for (let i = 0; i < friendlistKey.length; i++) {
    const data = await client.HGETALL(`user:${friendlistKey[i]}`);

    friendArr.push({
      ...data,
      email: friendlistKey[i],
    });
  }
  for (let i = 0; i < pendingResponseKey.length; i++) {
    const data = await client.HGETALL(`user:${pendingResponseKey[i]}`);

    pendingArr.push({
      ...data,
      email: pendingResponseKey[i],
    });
  }

  return {
    pendingFriend: pendingArr,
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
  const user = await client.HSET(`user:${userEmail}:friendlist`, friendEmail,"");
  const friend = await client.HSET(`user:${friendEmail}:friendlist`, userEmail,"");
  const isDeletedFromPendingRequest = await client.HDEL(
    `user:${userEmail}:pending:friend`,
    friendEmail
  );
  if (!user || !friend || !isDeletedFromPendingRequest) {
    return null;
  }
  return true;
};

export async function removeUserFromPendingRequest (userEmail:string,friendEmail:string) {
  await client.HDEL(`user:${userEmail}:pending:friend`, friendEmail);
}

export { setUserHash, getUserHash, addUserToFriend, getUserFriends };

// export async function addUserPendingRequest(){
//   // const res = await client.
// }
