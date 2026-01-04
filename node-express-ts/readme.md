# Kafka in Node express Typescript

# Architecture

```css
[ Express API ] → Producer → [ Kafka Topic ] → Consumer → Console
```

# Project structure

```
node-express-ts/
 ├─ kafka.ts
 ├─ producer.ts
 ├─ consumer.ts
 └─ index.ts

```

# Run

```
npm run dev
```

# Test

```
curl -X POST http://localhost:3000/user \
-H "Content-Type: application/json" \
-d '{"name":"Abdur Shobur"}'

```

# Result

```
Message sent: User created: Abdur Shobur
Message received: User created: Abdur Shobur
```
