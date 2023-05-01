import { ALPHABET } from "./data.js"

export class Morse {
    constructor(time_unit = 100, alphabet = ALPHABET) {
        this.alphabet = alphabet;
        this.time_unit = time_unit;

        this.is_pressed = false;
        this.timeout = null;    
        this.data = [];
        this.morse = [];
        this.chars = [];
    }

    get_duration() {
        return this.data.length > 1 ? this.data.at(-1) - this.data.at(-2) : 0;
    }

    get_whitespace(pause) {
        return pause < 2 * this.time_unit ? "" : " "
    }

    get_symbol(pause) {
        return pause < 2 * this.time_unit ? "." : "-";
    }

    get_char(morse) {
        let result = this.alphabet[morse.join("")];
        return result == undefined ? "?" : result;
    }

    flush() {
        this.chars.push(this.get_char(this.morse));
        this.morse = [];
    }

    start() {
        if (this.is_pressed) return;
        this.is_pressed = true;

        this.data.push(Date.now());
        if (this.timeout) clearTimeout(this.timeout);
    }

    end() {
        if (!this.is_pressed) return;
        this.is_pressed = false;

        this.data.push(Date.now());
        this.morse.push(this.get_symbol(this.get_duration()));

        this.timeout = setTimeout(() => this.flush(), 2 * this.time_unit);
    }
}
