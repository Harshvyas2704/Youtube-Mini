// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=kgf%202&key=[YOUR_API_KEY] 

const API = "AIzaSyBRlfi4xeH2DD-sMZBQGUJIBVexEGqng2E"
// const url2 = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=trending&key=${API}`

const trendingVideo = async () =>{
    try{
        let q = "trending"
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${q}&key=${API}`)
        console.log('res:', res)
        const data = await res.json()
        console.log('data:', data.items)
        append2(data.items)
    } catch(err){
        console.log('err:', err)
        
    }
    
}
trendingVideo()

const append2 = (trendingVideos) =>{
    let show_videos = document.querySelector("#show_videos")
    show_videos.innerHTML = null
    trendingVideos.forEach(({ id: { videoId }, snippet: { title,  thumbnails} }) => {

        let div = document.createElement("div")

        let iFrame = document.createElement("iframe")
        iFrame.src = `https://www.youtube.com/embed/${videoId}`
        iFrame.width = "100%"
        iFrame.height = "80%"
        iFrame.allow = "fullscreen"

        let thumbNails = document.createElement("img")
        thumbNails.src = thumbnails.high.url
        console.log('url:', thumbnails.high.url)
        thumbNails.width = "100%"
        thumbNails.height = "100%"

        let name = document.createElement("h4")
        name.innerText = title
        name.style.color="white"

        div.append(thumbNails, name)
        let data = {
            title, videoId
        }
        div.onclick = () => {
            showVideo(data)
        }
        show_videos.append(div)

    })
}



const searchVideos = async () => {
    try {
        let q = document.querySelector("#query").value


        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${q}%202&key=${API}`)

        const data = await res.json()
        // console.log('data:', data.items)
        append(data.items)


    } catch (err) {
        console.log('err:', err)

    }
}

const append = (videos) => {

    let show_videos = document.querySelector("#show_videos")
    show_videos.innerHTML = null

    videos.forEach(({ id: { videoId }, snippet: { title,  thumbnails} }) => {

        let div = document.createElement("div")

        let iFrame = document.createElement("iframe")
        iFrame.src = `https://www.youtube.com/embed/${videoId}`
        iFrame.width = "100%"
        iFrame.height = "80%"
        iFrame.allow = "fullscreen"

        let thumbNails = document.createElement("img")
        thumbNails.src = thumbnails.high.url
        // console.log('url:', thumbnails.high.url)
        thumbNails.width = "100%"
        thumbNails.height = "100%"

        let name = document.createElement("h4")
        name.innerText = title
        name.style.cursor="pointer"
        name.style.color="white"

        div.append(thumbNails, name)
        let data = {
            title, videoId
        }
        div.onclick = () => {
            showVideo(data)
        }
        show_videos.append(div)

    })
}

const showVideo = (data) => {
    localStorage.setItem("video", JSON.stringify(data))
    window.location.href = "video.html"
}

