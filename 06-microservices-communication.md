# Microservices Communication

- Kafka = Microservices এর event backbone
- Services শুধু publish করে, consume করে independently

একাধিক ছোট ছোট independent service একে অপরের সাথে data বা message আদান-প্রদান করে।

Microservices এর জন্য communication দুইভাবে হয়:

- Synchronous (Request/Response)

  - এক service অন্যকে কল করে, response পর্যন্ত অপেক্ষা করে
  - যেমন: REST API, gRPC
  - সমস্যা: Slow, যদি কোনো service down থাকে তাহলে পুরো chain down হতে পারে

- Asynchronous (Event/Message driven)

  - এক service শুধু event publish করে,
  - অন্য service পরে পড়বে
  - এক service down হলেও system চলতে থাকে
  - Kafka perfect solution

# Kafka দিয়ে Microservices Communication কেমন হয়?

**Producer → Kafka → Consumer**

```
Order Service (Producer)
       │
       ▼
   Kafka Topic: orders
       │
       ▼
Payment Service (Consumer)
Email Service (Consumer)
Inventory Service (Consumer)

```

- Order Service কাউকে চেনে না
- শুধু OrderCreated event publish করে
- যে service দরকার, সে event consume করে

# কেন Kafka ভালো Microservices-এ?

- Loose coupling
  - Services একে অপরের implementation জানে না
- Scalable
  - Partition & multiple brokers → heavy traffic handle করতে পারে
- Reliable & durable
  - Event loss নেই (Replication)
- Multiple consumers
  - এক event একাধিক service ব্যবহার করতে পারে
- Real-time
  - Milliseconds latency → near real-time communication

# Example: E-commerce flow

Scenario: User places order

- Order Service → publish OrderCreated event
- Payment Service → consume event → process payment
- Inventory Service → consume event → update stock
- Email Service → consume event → send confirmation

সব service একে অপরের ওপর dependent নয়
System fault tolerant & scalable

**Traditional VS Event Driven**

| Feature            | Traditional API | Kafka Event-Driven |
| ------------------ | --------------- | ------------------ |
| Coupling           | Tight           | Loose              |
| Scalability        | Hard            | Easy               |
| Fault tolerance    | Low             | High               |
| Multiple consumers | Hard            | Easy               |
| Real-time          | Limited         | Yes                |
