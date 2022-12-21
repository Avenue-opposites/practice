class BinHexOct {
    constructor(initValue) {
        this.value = +initValue;
    };
   setValue(newVaule) {
    this.value = +newVaule;
   };
   BIN() {
    return +(this.value.toString(2));
   }
   OCT() {
    return +(this.value.toString(8));
   }
   DEN() {
    return +(this.value.toString());
   }
   HEX() {
    return (this.value.toString(16));
   }
};

const input = document.getElementById("input");
const 区位码 = document.getElementById("区位码");
const result = document.getElementById("result");
const 国标码 = document.getElementById("国标码");
const bin = document.getElementById("bin");
const oct = document.getElementById("oct");
const den = document.getElementById("den");
const hex = document.getElementById("hex");
const Hex = new BinHexOct();
input.addEventListener("change",(e) => {
    Hex.setValue(e.target.value);
});

bin.addEventListener("click",() => {
    result.innerText = "结果:"+Hex.BIN();
});
oct.addEventListener("click",() => {
    result.innerText = "结果:"+Hex.OCT();
});
den.addEventListener("click",() => {
    result.innerText = "结果:"+Hex.DEN();
});
hex.addEventListener("click",() => {
    result.innerText = "结果:"+Hex.HEX();
});

区位码.addEventListener("change",(e) => {
    let value = e.target.value.trim();
    const 区 = new BinHexOct(value.substring(0,2)).HEX();
    const 位 = new BinHexOct(value.substring(2,4)).HEX();
    国标码.innerHTML = `国标码:${((+("0x"+区+位))+0x2020).toString(16)}`;
})

