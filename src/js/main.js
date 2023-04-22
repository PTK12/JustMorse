import { Button } from "./button.js";
import { load_words } from "./text.js";

function bind_button(button = new Button()) {
    let btn = document.getElementById("morse-button");

    btn.addEventListener("mousedown", event => { button.start_press(); });
    btn.addEventListener("mouseup", event => { button.end_press(); });

    btn.addEventListener("touchstart", event => { button.start_press(); event.preventDefault(); });
    btn.addEventListener("touchend", event => { button.end_press(); event.preventDefault(); });

    window.addEventListener("keydown", event => {
        if (event.key == " " && !event.repeat) {
            button.start_press();
        }
    });

    window.addEventListener("keyup", event => {
        if (event.key == " ") {
            button.end_press();
        }
    });
}

function setup_textbox(words = load_words()) {
    let txt = document.getElementById("input-box");
    txt.innerHTML = `<span id="before-caret"></span><span id="caret">${words[0]}</span><span id="after-caret">${words.slice(1)}</span>`;
}

function setup_autoscroll(time = 500) {
    setInterval(() => {
        let caret = document.getElementById("caret");
        caret.parentElement.scrollTo({top: caret.offsetTop - caret.parentNode.offsetTop, behavior: "smooth"});
    }, time);
}

setup_textbox();
setup_autoscroll();
bind_button();
