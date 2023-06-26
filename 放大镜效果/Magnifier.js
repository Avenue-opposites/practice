class Magnifier {
    imageTarget = null;
    scale = 3;
    size = 300;
    container = null;
    enlargeImage = null;
    constructor(options) {
        if(!options && options.toString() === "[object Object]") {
            throw new Error("需要传入options,并且是一个对象!");
        }
        const { target,scale,size } = options;
        if (target instanceof HTMLImageElement) {
            target.draggable = false;
            this.imageTarget = options.target;
        } else {
            throw Error("options.target 必须是 HTMLImageElement!");
        }
        if (typeof scale === "number" && scale > 1) {
            this.scale = scale;
        }
        if (typeof size === "number" && size > 0) {
            this.size = size;
        }
    }
    init() {
        //创建div和img
        const div = this.container = document.createElement("div");
        const img = this.enlargeImage = document.createElement("img");
        //添加到div子元素
        div.appendChild(img);
        //需要放大图片的地址
        const imageUrl = this.imageTarget.src;
        //设置div的基本样式
        div.style.cssText = `
            opacity:0;
            visibility:hidden;
            transition:opacity .3s;
            background-color:grey;
            position:fixed;
            left:0;
            top:0;
            width:${this.size}px;
            height:${this.size}px;
            overflow:hidden;
            border-radius:50%;
            pointer-events:none;
        `;
        //设置放大图片的路径
        img.src = imageUrl;
        //设置放大图片的样式
        img.style.transformOrigin = "top left";
        //事件绑定
        this.#eventBind();
        document.body.appendChild(div);
    }
    #eventBind() {
        //放大图片的容器
        const div = this.container;
        const img = this.enlargeImage;
        //创建移动时调用的函数
        const setMove = this.#createSetMover();
        //添加鼠标事件
        this.imageTarget.addEventListener("mousedown", (event) => {
            img.style.width = `${this.imageTarget.clientWidth}px`;
            img.style.height = `${this.imageTarget.clientHeight}px`;
            div.style.transform = `translate(${event.clientX + 20}px,${event.clientY + 20}px)`
            div.style.opacity = 1;
            div.style.visibility = "visible";
            this.imageTarget.addEventListener("mousemove", setMove);
        });
        //创建需要取消监听的函数
        const canal = this.#createRemoveEventListener(setMove);
        this.imageTarget.addEventListener("mouseover", canal);
        this.imageTarget.addEventListener("mouseup", canal);
    }
    #createSetMover = () => {
        //图片的宽和高
        const imageWidth = this.imageTarget.clientWidth;
        const imageHeight = this.imageTarget.clientHeight;
        //目标图片的偏移量
        const offsetLeft = this.imageTarget.offsetLeft;
        const offsetTop = this.imageTarget.offsetTop;
        //放大图片尺寸的一半的根据放大尺寸缩小
        const normalSize = this.size / 2 / this.scale;
        const img = this.enlargeImage;
        const div = this.container;
        return (event) => {
            //鼠标坐标
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            //鼠标相对图片的坐标
            const temporaryX = mouseX - offsetLeft - normalSize;
            const temporaryY = mouseY - offsetTop - normalSize;
            //变为负数方便偏移
            const x = temporaryX * -1;
            const y = temporaryY * -1;
            //设置放大图片的偏移量
            img.style.transform = `scale(${this.scale}) translate(${x}px,${y}px)`;
            //判断鼠标偏移到目标图片宽度的一半更换移动方向
            if ((x * -1) <= imageWidth / 2 - normalSize) {
                div.style.transform = `translate(${mouseX}px,${mouseY}px)`;
            } else {
                div.style.transform = `translate(${mouseX - this.size}px,${mouseY}px)`;
            }
        };
    }
    #createRemoveEventListener = (event) => {
        const div = this.container;
        return () => {
            div.style.opacity = 0;
            div.style.visibility = "hidden";
            //取消传入的函数监听
            this.imageTarget.removeEventListener("mousemove", event);
        }
    };
}