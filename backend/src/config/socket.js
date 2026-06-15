let io;

export const initializeSocket = (socketServer) => {
    io = socketServer;

    io.on("connection", (socket) => {
        console.log(`Socket Connected: ${socket.id}`);

        /*
         * Frontend will send:
         * socket.emit("join", userId)
         */
        socket.on("join", (userId) => {
            socket.join(`user:${userId}`);

            console.log(
                `Socket ${socket.id} joined room user:${userId}`
            );
        });

        socket.on("disconnect", () => {
            console.log(
                `Socket Disconnected: ${socket.id}`
            );
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error(
            "Socket.IO not initialized"
        );
    }

    return io;
};