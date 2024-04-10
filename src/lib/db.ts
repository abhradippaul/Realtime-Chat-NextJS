import { createClient } from "redis";

const client = createClient({
    socket : {
        host : "localhost",
        port : 6379
    }
})
client.on("error",(err) => {
    console.log("The redis error is ",err);
})

if(!client.isOpen) {
    client.connect();
}

const setString = async(key:string,value:string) => {
    await client.set(key,value)
    console.log("value set successfully");
}

export {
    setString
}