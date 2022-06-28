console.log("everything is fine we are ready to go")
let index = 0;
let AudioElement = new Audio('1.mp3')
let masterPlay = document.getElementById('masterplay')
let myprogressbar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let mastersongname = document.getElementById('mastersongname')
let songitem = Array.from(document.getElementsByClassName('songItem'));
let Song =[
    {ids:"1", songname:"rockstar1", filepath:"1.mp3", coverpath:"logo.jpg"},
    {ids:"2", songname:"rockstar2", filepath:"2.mp3", coverpath:"logo.jpg"},
    {ids:"3", songname:"rockstar3", filepath:"3.mp3", coverpath:"logo.jpg"},
    {ids:"4", songname:"rockstar4", filepath:"4.mp3", coverpath:"logo.jpg"},

]
// AudioElement.play();

masterPlay.addEventListener('click', ()=>{
    if(AudioElement.paused || AudioElement.currentTime <= 0 ){
        AudioElement.play();
        masterPlay.setAttribute('src','forward.png')
        gif.style.opacity = 1;
    }
    else{
        AudioElement.pause();
        masterPlay.setAttribute('src','playbutton.png')
        gif.style.opacity = 0;
    }

})

songitem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = Song[i].coverpath;
    element.getElementsByClassName('songName')[0].innerText = Song[i].songname;
});

AudioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((AudioElement.currentTime/AudioElement.duration)*100)
    console.log(progress)
    myprogressbar.value = progress
})

myprogressbar.addEventListener('change', ()=>{
    AudioElement.currentTime = myprogressbar.value * AudioElement.duration/100;
})

makeAllPlays = ()=>{
    Array.from( document.getElementsByClassName('play')).forEach((element)=>{
    element.setAttribute('src','playbutton.png');

})
}

Array.from( document.getElementsByClassName('play')).forEach((element,i)=>{
    element.addEventListener('click', (e)=>{
    if(AudioElement.paused || AudioElement.currentTime <= 0 ){
        makeAllPlays();
        index = parseInt(Song[i].ids);
        console.log(index)
        e.target.setAttribute('src','forward.png')
        AudioElement.src = `${index}.mp3`;
        gif.style.opacity = 1;
        mastersongname.innerText = Song[index - 1].songname;
        console.log(mastersongname)
        AudioElement.currentTime = 0;
        masterPlay.setAttribute('src','forward.png')
        AudioElement.play();
    }
    else{
        AudioElement.pause();
        masterPlay.setAttribute('src','playbutton.png')
        e.target.setAttribute('src','playbutton.png')
        gif.style.opacity = 0;
    }
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(index >4){
        index = 1
    }
    else{
        index +=1
    }
    AudioElement.src = `${index}.mp3`;
    mastersongname.innerText = Song[index].songname;
    AudioElement.currentTime = 0;
    gif.style.opacity = 1;
    masterPlay.setAttribute('src','forward.png')
    AudioElement.play();
})

document.getElementById('prev').addEventListener('click',()=>{
    if(index <=1){
        index = 1
    }
    else{
        index -=1
    }
    AudioElement.src = `${index}.mp3`;
    mastersongname.innerText = Song[index].songname;
    AudioElement.currentTime = 0;
    gif.style.opacity = 1;
    masterPlay.setAttribute('src','forward.png')
    AudioElement.play();
})