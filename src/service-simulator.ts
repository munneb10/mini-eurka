import axios, { AxiosResponse } from "axios";
import { randomUUID } from "crypto";

const id = randomUUID();
const name = "payment-service";

async function register() {
    await axios.post("http://localhost:3000/register", {
        id,
        name,
        host: "localhost",
        port: 4000,
    });
    console.log(`${name} registered.`);
}

async function heartbeat() {
    await axios.post("http://localhost:3000/heartbeat", { id, name }).then((response: AxiosResponse) => {
        if(response.data.isAlive) {
            console.log(`${name} heartbeat 💓`);
        }else {
            console.log(`${name} is not registered.`);
        }
    })
}

(async () => {
  await register();
  setInterval(heartbeat, 3000);
})();
