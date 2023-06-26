const carousel = new Carousel({
    container:document.querySelector(".container"),
    width:800,
    height:400,
    images:[
        "./images/1.jpg",
        "./images/2.jpg",
        "./images/3.jpg",
        "./images/4.jpg",
        "./images/5.jpg",
    ],
    loop:true,
    direction:DIRECTION.HORIZONTAL,
    play:PLAY_SETTING.DEFAULT,
    transitionTime:500,
    timeout:3000
});
// console.log(carousel);
carousel.init();

const pre = document.querySelector(".pre");
const next = document.querySelector(".next");
pre.onclick = function() {
    carousel.pre();
};
next.onclick = function() {
    carousel.next();
};

// setInterval(() => {
//     carousel.next();
// }, 3000);