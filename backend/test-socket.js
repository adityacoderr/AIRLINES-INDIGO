import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected:", socket.id);

    socket.emit("join", "user1");
});

socket.on("notification", (data) => {
    console.log("\nNotification received:");
    console.log(JSON.stringify(data, null, 2));
});

socket.on("disconnect", () => {
    console.log("Disconnected");
});