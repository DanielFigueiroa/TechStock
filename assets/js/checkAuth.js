if (checkIfLoggedIn().Authorization == undefined) window.location = "/";

fetch("/api/ticket", {
    headers: checkIfLoggedIn(),
}).then((e) => {
    if (e.status === 403) window.location = "/";
});

function checkIfLoggedIn() {
    return { Authorization: "Bearer " + localStorage.getItem("token") };
}
