function isVisible(element) {
    return window.getComputedStyle(element).visibility != "hidden";
}

function setVisible(element, visible) {
    element.style.visibility = visible ? "visible" : "hidden";
}

function toggleVisibleWithFade(id, sec, step) {
    if (typeof id == "string") {
        sec = sec || 0.5;
        if (step == undefined || step == 0.0) {
            step = 0.1;
        }
        var element = document.getElementById(id);
        if (isVisible(element)) {
            FadeIn(element, sec, -step);
        } else {
            FadeIn(element, sec, step);
        }
    }
}

function FadeIn(element, sec, step) {
    element.style.opacity = 0;
    trans = (step > 0 ? 0 : 1);
    if (step > 0) {
        element.style.opacity = 0;
        element.style.visibility = "visible";
    }
    var timer = setInterval(() => {
        trans += step;
        if (step > 0 && trans >= 1 || step < 0 && trans <= 0) {
            if (step < 0) element.style.visibility = "hidden";
            clearInterval(timer);
            return;
        }
        element.style.opacity = trans;
    }, sec * Math.abs(step) * 100);
}

let map = new Map();

function expand_collapse(parentElementId, elementId) {
    parentElement = document.getElementById(parentElementId);
    element = document.getElementById(elementId);
    if (element == null) {
        parentElement.appendChild(map.get(elementId));
    } else {
        map.set(elementId, element);
        element.remove();
    }
    //setVisible(element, !isVisible(element));
}