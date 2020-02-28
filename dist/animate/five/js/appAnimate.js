function initZoomHtml(W) {
    const iContainer = $(".container")
    const iframeWidth = iContainer.width();//1125
    const H = W * iContainer.height() / iframeWidth;
    // const zoomW = formatMoney(W / iframeWidth, 6);
    const iFrameHeight = H + 10;
    postMessageToTop('initHeight', iFrameHeight);
};


function bcAdd(arg1, arg2) {
    let r1, r2, m;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

function formatMoney(val, v2 = 2) {
    val = Number(val);
    if (isNaN(val)) {
        return 0;
    }
    return Number(val.toFixed(v2));
}