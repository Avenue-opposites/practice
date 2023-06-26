const DIRECTION = {
    HORIZONTAL: "Horizontal",
    VERTICAL: "vertical"
};
const PLAY_SETTING = {
    AUTO: "auto",
    DEFAULT: "default"
};

class Carousel {
    #container = null;
    #div = null;
    #width = 600;
    #height = 400;
    #unit = "px";
    #images = [];
    #x = 0;
    #y = 0;
    #index = 0;
    #loop = false;
    #direction = DIRECTION.HORIZONTAL;/* Horizontal or vertical */
    #play = PLAY_SETTING.DEFAULT;
    #transitionTime = 300;
    constructor(options) {
        if (options === null || options.toString() !== "[object Object]") {
            throw new Error("options must is object.");
        }
        const { container, width, height, images, unit, loop, transitionTime } = options;
        if (container instanceof HTMLElement) {
            this.#container = container;
        } else {
            throw new Error("container must is HTMLElement.")
        }
        if (typeof width === "number" && typeof height === "number" && width > 0 && height > 0) {
            this.#width = width;
            this.#height = height;
        }
        if (typeof unit === "string" && unit.trim() !== "") {
            this.#unit = unit;
        }
        if (Array.isArray(images) && images.every(src => typeof src === "string")) {
            this.#images = images;
        }
        if (typeof loop === "boolean") {
            this.#loop = loop;
        }
        if (typeof transitionTime === "number" && transitionTime > 0) {
            this.#transitionTime = transitionTime;
        }
    }
    init() {
        const container = this.#container;
        const images = [this.#images[this.itemTotal - 1], ...this.#images, this.#images[0]].map(src => this.#createImage(src));
        const div = this.#div = document.createElement("div");
        container.style.cssText = `
            overflow:hidden;
        `;
        this.#x -= this.#width;
        this.#div.style.cssText = `
            transition-property:transform;
            transition-duration:${this.#transitionTime}ms;
            transition-timing-function:ease;
            display:flex;
            transform:translateX(${this.x});
        `;
        container.style.width = this.width;
        container.style.height = this.height;
        images.forEach(img => div.appendChild(img));
        container.append(div);
    }
    next() {
        //判断是否循环
        if (this.#loop) {
            if (this.isEnd()) {
                setTimeout(() => {
                    this.#index = 0;
                    this.#x = this.#width * -1;
                    this.#div.style.transitionDuration = "0s";
                    this.move();
                }, this.#transitionTime);
            }
            this.#index++;
            this.#x -= this.#width;
            this.#div.style.transitionDuration = `${this.#transitionTime}ms`;
            this.move();
        } else {
            if (this.isEnd()) return;
            this.#index++;
            this.#x -= this.#width;
            this.move();
        }
    }
    pre() {
        console.log(this.#index);
        if (this.#loop) {
            if (this.isStart()) {
                setTimeout(() => {
                    this.#index = 5;
                    this.#x = this.#width * this.#index * -1;
                    this.#div.style.transitionDuration = "0s";
                    this.move();
                }, this.#transitionTime);
            }
            this.#index--;
            this.#x += this.#width;
            this.#div.style.transitionDuration = `${this.#transitionTime}ms`;
            this.move();
        } else {
            if (this.isStart()) return;
            this.#index--;
            this.#x += this.#width;
            this.move();
        }
    }

    isEnd() {
        return this.#index >= this.itemTotal - 1;
    }
    isStart() {
        return this.#index <= 0;
    }
    move() {
        this.#div.style.transform = `translateX(${this.x})`;
    }
    item(index) {
        return this.#div.children[index] || null;
    }
    get loop() {
        return this.#loop;
    }
    set loop(newValue) {
        if (typeof newValue === "boolean") {
            this.#loop = newValue;
        }
    }
    get preElement() {
        return this.currentElement.previousElementSibling;
    }
    get nextElement() {
        return this.currentElement.nextElementSibling;
    }
    get currentElement() {
        return this.#div.children[this.#index];
    }
    get itemTotal() {
        return this.#images.length;
    }
    get width() {
        return `${this.#width}${this.#unit}`;
    }
    get height() {
        return `${this.#height}${this.#unit}`;
    }
    get x() {
        return `${this.#x}${this.#unit}`;
    }
    get y() {
        return `${this.y}${this.unit}`;
    }
    #createImage(src) {
        const img = document.createElement("img");
        img.style.cssText = `
            width:${this.width};
            height:${this.height};
            object-fit:cover;
        `;
        img.draggable = false;
        img.src = src;
        return img;
    }
}
