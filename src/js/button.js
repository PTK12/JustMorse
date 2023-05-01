import { Morse } from "./morse.js";

const context = new window.AudioContext();

export class Button {
    constructor(morse = new Morse()) {
        morse.flush = this.decorate(morse.flush);

        this.morse = morse;
        this.osc = null;
        this.spans = ["before-caret", "caret", "after-caret"].map((x) => document.getElementById(x));
    }

    decorate(f) {
        return () => {
            f.call(this.morse);

            if (this.morse.chars[0] == this.spans[1].innerHTML.toUpperCase()) {
                this.next_char();
            }

            this.morse.chars = [];
        }
    }


    play_sound(type = "sine", frequency = 440) {
        if (this.osc != null) return;

        this.osc = context.createOscillator();
        this.osc.type = type;
        this.osc.frequency.value = frequency;
        this.osc.connect(context.destination);
        this.osc.start();
    }

    end_sound() {
        if (this.osc == null) return;

        this.osc.stop()
        this.osc = null;
    }

    start_press() {
        if (this.osc != null) return;

        this.morse.start();
        this.play_sound();
    }

    end_press() {
        if (this.osc == null) return;

        this.morse.end();
        this.end_sound();
    }

    next_char() {
        let char = this.spans[1].innerHTML
        this.spans[0].innerHTML += char;

        let after = this.spans[2].innerHTML;
        if (after == "") return;
        this.spans[1].innerHTML = after[0];
        this.spans[2].innerHTML = after.slice(1);

        if (after[0] == " ") this.next_char();
    }
}
