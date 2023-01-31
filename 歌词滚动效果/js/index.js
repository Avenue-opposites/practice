const doms = {
    audio:document.querySelector("audio"),
    lyricList:document.querySelector(".lyric-list"),
    container:document.querySelector(".container")
}
/**
 * @param {string} lyric 歌词
 * @return {Array<object>}
*/
function formatLyric(lyric) {
    let lyricArray = lyric.split(/\n/);
    console.log(lyricArray);
    return lyricArray.map(words => {
       
        let time = timeStringFormat(words.match(/\[(.*)\]/)[1])
        let word = words.match(/\](.*)/)[1]; 
        // let word = words.match(/(.*)\[/)[1];
        // console.log(time,word);
        return {time,word};
    });
}
//格式化字符串时间
function timeStringFormat(time) {
    let minute = Number(time.split(/:/)[0]);
    let second = Number(time.split(/:/)[1]);
    time = (minute * 60000 + second * 1000) / 1000;
    return time;
}


function findIndex(lyric,audio) {
  let i = 0;
  for (let i = 0; i < lyric.length; i++) {
    if(audio.currentTime < lyric[i].time) return i - 1;
  }
  return lyric.length - 1;
}

function render(parent,lyric) {
    const fragment = document.createDocumentFragment();//文档片段
    for(let i = 0;i < lyric.length;i++) {
        const { word } = lyric[i];
        const li = document.createElement("li");
        li.innerText = word;
        fragment.appendChild(li);//添加到片段中,合并添加
    }
    parent.appendChild(fragment);
}


function setOffset(lyricList,index) {
    let containerHeight = doms.container.clientHeight;
    let liHeight = doms.lyricList.children[0].clientHeight;
    let offset = liHeight * index + liHeight / 2 - containerHeight / 2;
    const max = lyricList.clientHeight - containerHeight / 2 + liHeight / 2;
    if(offset < 0) {
        lyricList.style.transform = `translateY(${offset * -1}px)`;
        return;
    };
    if(offset >= max) offset = max;
    lyricList.style.transform = `translateY(-${offset}px)`;
}

function setLyricLight(lyricList) {
    let pre = null;
    return (index) => {
        const current = doms.lyricList.children[index];
        if(doms.audio.ended) {
            pre && pre.classList.remove("active-words");
            current.classList.add("active-words");
        }
        pre && pre.classList.remove("active-words");
        current.classList.add("active-words");
        pre = current;
    }
}
console.log(lyric);
lyric =  formatLyric(lyric);
console.log(lyric);

render(doms.lyricList,lyric);

let set = setLyricLight(doms.lyricList);

doms.audio.addEventListener("timeupdate",() => {
    const index = findIndex(lyric,doms.audio);
    setOffset(doms.lyricList,index);
    set(index);
});













