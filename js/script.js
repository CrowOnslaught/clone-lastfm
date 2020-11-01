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

function loadSongs (array, amount = 0)//amount=0 means array.length
{
    m_listContainer.innerHTML ="";
    
    for(let i=0; i< (amount>0?amount:array.length); i++)
    {
        let l_song = array[i];

        let l_artist    = l_song.artist.name;
        let l_url       = l_song.artist.url;
        let l_name      = l_song.name;
        let l_listeners = l_song.listeners;

        m_listContainer.innerHTML += l_song.getNewElement(l_artist, l_url, l_name, l_listeners);
    }
}

const loadOverview = () =>
{
    m_titleContainer.innerHTML = "Overview";

    loadSongs(m_songsList)
}

const loadTenListened = ()=>
{
    m_titleContainer.innerHTML = "Top 10 Listened";

    let l_array = [...m_songsList];
    l_array.sort(function (a, b) 
    {
        return (b.listeners-a.listeners)
    });

    loadSongs(l_array,10);
}

const loadBiggest = (e)=>
{
    m_titleContainer.innerHTML = "The Biggest";

    let l_dictionary = [];
    for(let song of m_songsList)
    {
        let l_index = -1;
        for(let i = 0; i < l_dictionary.length; i++)
        {
            if(l_dictionary[i].artist == song.artist.name)
            {
                l_index = i;
                break;
            }
        }

        if(l_index >=0)
        {
            l_dictionary[l_index].listeners += song.listeners;
        }
        else
        {
            let l_object =
            {
                artist: song.artist.name,
                listeners: song.listeners,
            };
            l_dictionary.push(l_object);
        }
    }
    l_dictionary.sort(function (a, b) 
    {
        return (b.listeners-a.listeners)
    });

    let l_result = [];
    for(let song of m_songsList)
    {
        if(song.artist.name == l_dictionary[0].artist)
            l_result.push(song);
    }
    loadSongs(l_result);
}

const loadGenre = (genre) =>
{
    let l_array = [];
    let l_genre;

    switch (genre)
    {
        case 0:
            l_genre = "rock";
            break;
        case 1:
            l_genre = "hip-hop";

            break;
        case 2:
            l_genre = "indie";
            break;
        case 3:
            l_genre = "jazz";
            break;
        case 4: 
            l_genre = "reggae";
            break;
    }
    m_titleContainer.innerHTML = l_genre;

    for(let song of m_songsList)
    {
        if(song.genre == l_genre)
            l_array.push(song);
    }
    
    loadSongs(l_array);
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
    let l_productDATA = "https://raw.githubusercontent.com/JaumeGarciaBit/clone-lastfm/master/data/music.json";
    let l_promise = fetch(l_productDATA);
    l_promise.then(response => response.json())
            .then(data =>
            {            
                data.forEach(e =>
                    {
                        let l_song = new Song(e);
                        m_songsList.push(l_song);
                    })
                    loadSongs(m_songsList);
            })
}


window.onload = init;

