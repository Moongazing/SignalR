$(document).ready(function () {


    const broadcastMessageToAllClientHubMethodCall = "BroadcastMessageToAllClient";
    const receiveMessageForAllClientHubMethodCall = "ReceiveMessageForAllClient";
    const connection = new signalR.HubConnectionBuilder().withUrl("/samplehub")
        .configureLogging(signalR.LogLevel.Information).build();


    function start() {
        connection.start().then(() => console.log("Hub connection success."));
    }


    try {
        start();
    }
    catch
    {
        setTimeout(() => start(), 5000);
    }

    connection.on(receiveMessageForAllClientHubMethodCall, (message) => {
        console.log("Receive message", message);
    })

    $("#btn-send-message-all-client").click(function () {
        const message = "hello world";

        connection.invoke(broadcastMessageToAllClientHubMethodCall, message).catch(err => console.error("error", err));
    })

})