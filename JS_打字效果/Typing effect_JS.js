window.onload = function() {
    const h1 = document.querySelector(".text");
    let delay = 0;
    let str = prompt("输入");
    
    if(/[\u4e00-\u9fa5]/g.test(str) || str === null) {
        str = "";
    }
    h1.innerText += str;
    h1.innerHTML = h1.textContent.replace(/\w|\s/g,"<span>$&</span>");
    for(let i = 0; i < h1.children.length;i++) {
        h1.children[i].classList.add("anima");
    };
    document.querySelectorAll(".anima").forEach(function(val) {
        delay += 0.1;
        if(val.innerText == "") {
            delay += 0.3;
        }
        val.style.setProperty("--delay",`${delay}s`);
    });
};