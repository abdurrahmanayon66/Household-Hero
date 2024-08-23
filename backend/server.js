const express = require('express');
const http = require('http'); // Import http module
const { Server } = require('socket.io'); // Import Server from socket.io
const pool = require('./db'); // Import the pool from the db.js file
const cors = require('cors');
const bodyParser = require('body-parser');
const helperRoutes = require('./routes/helperRoute');
const orderRoutes = require('./routes/orderRoute');
const userRoutes = require('./routes/userRoute');
const PORT = process.env.PORT; // Ensure PORT has a default value

const app = express();
const server = http.createServer(app); // Create the server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust to your client's URL
    methods: ["GET", "POST"]
  }
}); // Initialize Socket.io with the server

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/helper', helperRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// PostgreSQL LISTEN/NOTIFY setup
pool.connect((err, client) => {
  if (err) throw err;
  client.on('notification', (msg) => {
    io.emit('notification', JSON.parse(msg.payload));
  });
  client.query('LISTEN new_notification');
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
