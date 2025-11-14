# 🧭 Mini Eureka, a tiny Service Registry in TypeScript

Ever wondered how microservices *find each other* in the wild?
Like how does the `order-service` know where `payment-service` lives if containers keep restarting, IPs keep changing, and servers scale up and down?

That’s where a **Service Registry** steps in.
And this little project is my minimal, hand-built version of that idea a *tiny Eureka clone* written from scratch in TypeScript.

---

## 🧠 What this project is about

Modern systems are made of many moving parts.
They need to talk to each other **without hardcoding IPs or ports.**
So instead of saying:

```
POST http://10.0.1.24:5000/payments
```

Services say:

```
“Hey Registry, where’s payment-service?”
```

and the registry replies:

```
"localhost:4000 alive and healthy."
```

That’s the magic of **Service Discovery**.
It keeps distributed systems connected, scalable, and fault-tolerant.

---

## ⚙️ How it works

1. **A service starts up**
   → It registers itself with the registry using `/register`.

2. **It keeps sending heartbeats**
   → Every few seconds via `/heartbeat`, confirming it’s alive.

3. **Clients ask the registry for services**
   → `/discover/:name` returns a random healthy instance.

4. **Registry cleans up dead ones**
   → If a service stops sending heartbeats for too long it’s gone.

---

## 🧪 Try it out

Run the registry:

```bash
npm run dev
```

Simulate a service:

```bash
npm run simulate
```

Now discover it:

```bash
curl http://localhost:3000/discover/payment-service
```

If you see the service info, congrats you’ve just performed **dynamic service discovery** 🎉

---

## 🧰 Tech Stack

* **TypeScript** because strong typing makes distributed logic safer
* **Express.js** minimal REST interface
* **Axios** to simulate service requests
* **Node.js** for running everything lightweight and fast

---

## 🚀 Future ideas

* Add persistent storage (SQLite / Redis)
* Add active health-checking
* Add round-robin or weighted instance selection
* Turn it into a small open-source package for local testing setups

---

## 🧑‍💻 A short note

This project is not about complexity it’s about clarity.
It’s about understanding the *why* behind the systems we depend on.
Tiny projects like this remind me that every massive platform from Netflix to Kubernetes is just a bunch of small, well-thought-out patterns put together smartly.
