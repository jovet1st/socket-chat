
const socket = io();

const idValue = new URLSearchParams(window.location.search).get('id');
document.getElementById('myname').innerHTML = idValue;

socket.on("connect", () => {
    console.log("connected");
    const url = "http://localhost:4000/convo";
    fetch(url, { method: "GET" })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.forEach((item) => {
                const li = document.createElement("span");
                li.innerHTML = `
            <div class="d-flex flex-row justify-content-end">
            <div class="mb-2">
                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-warning">${item.message_text}</p>
            </div>
        </div>
            `;

                document.querySelector("#messages").appendChild(li);
            });
        })
});

socket.on("connect", () => {
    console.log("connected");
});

socket.on("chat", (message) => {

    const span = document.createElement("p");
    span.innerHTML = `<div class="d-flex flex-row justify-content-end">
                                        <div>
                                            <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${message.message_text}</p>
                                        </div>
                                    </div>`;

    document.querySelector("#messages").appendChild(span);

});

document.querySelector("#send").addEventListener("click", () => {

    const msg = document.querySelector("#message").value;
    document.querySelector("#message").value = '';
    socket.emit("chat", { user_id: 1, message_text: msg });

});