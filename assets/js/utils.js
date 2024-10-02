function getFilter() {
    let searchParamsMap = new Map(new URLSearchParams(window.location.search));
    let searchParamsObj = {};

    for (i of searchParamsMap.keys()) {
        searchParamsObj[i] = searchParamsMap.get(i);
    }

    return searchParamsObj;
}
