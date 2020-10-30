let m_songsList = [];
let m_listContainer, m_titleContainer;
let m_rockBtn, m_hiphopBtn, m_indieBtn, m_jazzBtn, m_reggaeBtn;
let m_overviewBtn, m_topTenBtn, m_biggestBtn;

class Song 
{
    name;
    duration;
    listeners;
    mbid;
    url;
    artist = 
    {
        name: "",
        mbid:"",
        url:"",
    };
    attr = 
    {
        rank:"",
    };
    genre;
    constructor(object)
    {
        this.name = object.name;
        this.duration = object.duration;
        this.listeners = object.listeners;
        this.mbid = object.mbid;
        this.url = object.url;
        this.artist = object.artist;
        this.attr = object.attr;
        this.genre = object.genre;
    }

    setItemLi()
    {
    }
    setItemGroupName(group,url){
    }
    setItemSongTitle(title){
    }
    setListeners(listeners){
    }
    getNewElement(group,url,title,listeners)
    {
        let l_li =
        `<li>
            <div>
                <i class="far fa-play-circle"></i>
                <a class= "groupName" href="${url}">${group}</a>
                <a href="${url}"><strong>${title}</strong></a>
            </div>
            <div>
                <p>${listeners} listeners</p>
            </div>
        </li>`

        return l_li;
    }

}

function loadSongs ()
{
    m_listContainer.innerHTML ="";
    for(let song of m_songsList)
    {
        let l_artist    = song.artist.name;
        let l_url       = song.artist.url;
        let l_name      = song.name;
        let l_listeners = song.listeners;

        m_listContainer.innerHTML += song.getNewElement(l_artist, l_url, l_name, l_listeners);
    }
}

const loadOverview = () =>{
}

const loadTenListened = ()=>
{
    let l_array = m_songsList;
    l_array.sort(function (a, b) {
        if (a.listeners < b.listeners)
            return 1;
        else if (a.listeners > b.listeners)
            return -1;
        else
            return 0;
    });

    console.log(l_array);
}

const loadBiggest = (e)=>{

}

const init = ()=>
{
    //Init members
    m_listContainer  = document.getElementById("list");
    m_titleContainer = document.getElementById("title"); 
    
    m_rockBtn   = document.getElementById("rockBtn"); 
    m_hiphopBtn = document.getElementById("hiphopBtn"); 
    m_indieBtn  = document.getElementById("indieBtn"); 
    m_jazzBtn   = document.getElementById("jazzBtn"); 
    m_reggaeBtn = document.getElementById("reggaeBtn"); 

    m_overviewBtn = document.getElementById("overviewBtn"); 
    m_topTenBtn   = document.getElementById("top10Btn"); 
    m_biggestBtn  = document.getElementById("biggestBtn"); 

    //Init events
    m_overviewBtn.addEventListener("click", loadOverview);
    m_topTenBtn  .addEventListener("click", loadTenListened)
    m_biggestBtn .addEventListener("click", loadBiggest);

    m_titleContainer.innerHTML = "Overview";
    readJsonFile();
    

}

function readJsonFile()
{
    let l_productDATA = "../data/music.json";
    let l_promise = fetch(l_productDATA);
    l_promise.then(response => response.json())
            .then(data =>
            {            
                data.forEach(e =>
                    {
                        let l_song = new Song(e);
                        m_songsList.push(l_song);
                    })
                    loadSongs();
            })
}


window.onload = init;

