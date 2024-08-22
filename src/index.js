require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("./config/db")();

// Routes
app.use("/register", require("./routes/users/register.routes"));
app.use("/login", require("./routes/users/login.routes"));
app.use("/get-user", require("./routes/auth/getUser"));
app.use("/get-otp", require("./routes/auth/requestOtp"));
app.use("/verify-otp", require("./routes/auth/verifyOtp"));
app.use("/change-password", require("./routes/users/changePassword.routes"));
app.use("/create-table", require("./routes/tables/createTable"));
app.use("/add-attendees", require("./routes/attendee/addAttendees"));
app.use("/update-presence", require("./routes/attendee/updatePresence"));
app.use("/update-user", require("./routes/users/update"));
app.use("/update-table", require("./routes/tables/updateTable"));
app.use("/delete-user", require("./routes/users/delete"));
app.use("/delete-table", require("./routes/tables/delete"));
app.use("/delete-attendee", require("./routes/attendee/delete"));
app.use("/update-attendee", require("./routes/attendee/updateName"));
app.use("/create-today-table", require("./routes/tables/createTodayTable"));
app.use("/get-tables", require("./routes/tables/getTables"));
app.use("/get-day-table", require("./routes/tables/get-day-table"));
app.use("/recent", require("./routes/tables/getRecent"));
app.use("/get-stats", require("./routes/getStats"));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
