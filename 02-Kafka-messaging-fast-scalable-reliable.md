# Kafka একটি মেসেজিং সিস্টেম

- এক সিস্টেম থেকে অন্য সিস্টেমে ডেটা / মেসেজ পাঠানোর মাধ্যম

```
Service A  →  Message Broker  →  Service B

```

- Kafka-তে:
  - Sender = Producer
  - Receiver = Consumer
  - মাঝখানে = Kafka
- মানে Kafka হলো মাঝখানের দালাল কিন্তু খুব শক্তিশালী দালাল।

---

# Kafka সাধারণ মেসেজিং সিস্টেম থেকে আলাদা

Kafka বলে:

- “আমি শুধু মেসেজ পাঠাবো না, আমি মেসেজ সংরক্ষণ করবো, কপি রাখবো, আর স্কেল করবো”

এই কারণেই বলা হয়:

- Kafka ≠ Traditional Message Queue

---

# খুবই দ্রুত (Fast)

**কারণগুলো:**

- Sequential disk write (খুব দ্রুত)
- Zero-copy mechanism
- Network optimized protocol

**বাস্তবে:**

- প্রতি সেকেন্ডে লাখ / কোটি মেসেজ
- latency → milliseconds
- তাই real-time system এ Kafka জনপ্রিয়

---

# স্কেলেবল (Scalable)

**Scalable মানে:**

- চাপ বাড়লেও সিস্টেম ভাঙবে না

**Kafka-তে:**

- Topic → Partition এ ভাগ করা
- Partition → বিভিন্ন Broker এ ছড়িয়ে থাকে
- নতুন broker যোগ করলেই capacity বাড়ে

```
১ লাখ user → ১০ লাখ user
Kafka শুধু নতুন broker যোগ করে handle করতে পারে

```

# নির্ভরযোগ্য (Reliable)

- Data loss হয় না
- Disk-এ লেখা থাকে
- Replication থাকে (একাধিক কপি)
- Consumer fail হলেও সমস্যা নেই
- Offset ধরে রাখা হয়
- আবার শুরু করা যায়
- Broker crash হলেও ডেটা থাকে
- অন্য broker থেকে recover হয়
- এজন্য ব্যাংকিং, payment, logging system-এ Kafka ব্যবহৃত হয়
