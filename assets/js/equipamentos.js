let resultStatuses = $.ajax({
    url: "/api/equipamento/statuses",
    type: "get",
    dataType: "json",
    async: false,
}).responseJSON.data;

function anchorToSelectStatus(event) {
    let selectElem = document.createElement("select");
    resultStatuses.forEach((e) => {
        let currOption = document.createElement("option");
        currOption.setAttribute("value", e.codigo);
        if (event.target.classList[0].split("-")[1] === e.codigo) {
            currOption.setAttribute("selected", "");
        }
        currOption.innerText = e.descricao;
        selectElem.appendChild(currOption);
    });
    event.target.replaceWith(selectElem);
    selectElem.onchange = (ev) => {
        let status = ev.target.value;

        let response = $.ajax({
            url: "/api/equipamento/",
            type: "get",
            dataType: "json",
            async: false,
        }).responseJSON.data;

        let replacementElem = document.createElement("div");
        replacementElem.className = "equipamento-replace-" + status;

        ev.target.parentElement.replaceWith(replacementElem);

        convertStatusElt();
        selectElem.remove();
    };
}

function convertStatusElt() {
    for (const statusObj of resultStatuses) {
        let status = statusObj.codigo;
        $(`.equipamento-replace-${status}`).replaceWith(() => {
            $(`.equipamento-replace-${status}`).html("class");
            return `
                <td>
                    <a onclick="anchorToSelectStatus(event)"
                        href="#"
                        class="status-${status}" >
                    ${getStatusDescricao(status)}
                    </a>
                </td>
                `;
        });
    }
}

function getStatusDescricao(codigo) {
    let result = resultStatuses.find((value) => value.codigo === codigo);
    return result.descricao || "";
}
