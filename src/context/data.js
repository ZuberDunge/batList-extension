/* global chrome */
import { createContext, useEffect, useState, useRef } from 'react';
import { db } from '../config/firebase-config';
import YTLogo from "./../assets/Youtube.png"
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const ListContext = createContext()

const ListContextProvider = (props) => {

    // api key and youtube link
    let apiKey = "AIzaSyBldi9w74UpY7_4PU3-88fG1Hhw9iX13yk"
    let link = "youtube.com/watch"
    const [isLoaded, setisLoaded] = useState(false)


    const [isLoggedIn, setIsLoggedIn] = useState(false)


    const checkIfLoggedIn = () => {
        let newUserID = JSON.parse(localStorage.getItem('userID'))
        if (newUserID != null) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }

    // get collection
    let newUserID = JSON.parse(localStorage.getItem('userID'))
    const auth = getAuth();
    const user = auth.currentUser;
    // const usersCollectionRef = collection(db, newUserID);


    // get current video data
    const [currentVideo, setCurrentVideo] = useState("")
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            var newURL = tabs[0].url
            if (newURL.includes(link)) {
                var newYTURL = newURL.replace("https://www.youtube.com/watch?v=", "");
                var apiLINK = "https://www.googleapis.com/youtube/v3/videos?id=" + newYTURL + "&key=" + apiKey + "&part=snippet,statistics,contentDetails";
                fetch(apiLINK)
                    .then(data => data.json())
                    .then(data => {
                        var newVideo = data.items[0];
                        setCurrentVideo(newVideo)
                        setisLoaded(true)
                        checkIfInList()
                    })

            } else {
            }
        })

    }, [user, chrome.tabs])



    const [causeReRender, setcauseReRender] = useState(false)
    // get data list
    const [batList, setBatList] = useState([])
    const [userName, setuserName] = useState("")
    const [mainList, setmainList] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        if (newUserID != null) {
            const usersCollectionRef = collection(db, newUserID);
            const getUsers = async () => {
                const data = await getDocs(usersCollectionRef);
                // setBatList(data.docs)
                setBatList(data.docs.filter(item => item._document.data.value.mapValue.fields.title.stringValue.length >= 1));
                let userNameData = data.docs.filter(item => item._document.data.value.mapValue.fields.username != null);
                setuserName(userNameData)
                setloading(true)
            };
            getUsers();
        }

    }, [causeReRender, user, localStorage.getItem("userID")]);

    const [rerenderRandom, setReRenderRandom] = useState(true)
    const showNotificationForRandom = (item) => {
        // eslint - disable - next - line react - hooks / exhaustive - deps
        chrome.notifications.create('test', {
            type: 'basic',
            iconUrl: YTLogo,
            title: `Playing ${item.title}`,
            message: `Hey ${userName[0]._document.data.value.mapValue.fields.username.stringValue}, ${random[Math.floor(Math.random() * random.length)]} 🌻`,
            priority: 2
        });
        setReRenderRandom(!rerenderRandom)
    }


    const [randomMusicVideo, setrandomMusicVideo] = useState("")
    const [randomData, setrandomData] = useState([])

    const playListIDs = ["RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g", "RDCLAK5uy_ngT3H4Vu-YMwwjFPt6Ocr3n7j2l-cUAeQ", "RDCLAK5uy_k1272v-yXtLJm7gmMiAxjOl-vh5aEC11A", "PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG"]

    useEffect(() => {
        const playListID = playListIDs[Math.floor(Math.random() * playListIDs.length)]
        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playListID}&key=${apiKey}&maxResults=50`)
            .then(data => data.json())
            .then(data => {
                setrandomMusicVideo(data.items[Math.floor(Math.random() * data.items.length)].snippet.resourceId.videoId)
                setrandomData(data.items[Math.floor(Math.random() * data.items.length)].snippet)
                // showNotificationForRandom(data.items[Math.floor(Math.random() * data.items.length)].snippet)
            })


    }, [rerenderRandom])
    // check and add video to list
    const [alreadyInList, setAlreadyInList] = useState(false)
    const addVideoToList = () => {
        const found = batList.some(item => item._document.data.value.mapValue.fields.link.stringValue === currentVideo.id);
        if (!found) {
            createUser()
            setAlreadyInList(true)
        } else {
            setAlreadyInList(true)
        }
    }

    const checkIfInList = () => {
        const found = batList.some(item => item._document.data.value.mapValue.fields.link.stringValue === currentVideo.id);
        if (!found) {
            setAlreadyInList(false)
        } else {
            setAlreadyInList(true)
        }
    }

    const createUser = async () => {
        const usersCollectionRef = collection(db, newUserID);
        const document = await addDoc(usersCollectionRef, { title: currentVideo.snippet.title, img: currentVideo.snippet.thumbnails.medium.url, link: currentVideo.id }, user.uid);
        setcauseReRender(!causeReRender)
        setAlreadyInList(true)
    };


    // delete video from list
    const deleteUser = async (id) => {
        const userDoc = doc(db, newUserID, id);
        await deleteDoc(userDoc);
        checkIfInList()
        setcauseReRender(!causeReRender)
    };






    // random
    const random = ["Take a break", "Have some water", "You've got this", "Everything will be fine", "Things will get better", "Keep Smiling", "Have a beautiful day", "Take care of yourself", "Spend some time with fam"]
    return (
        <ListContext.Provider value={{ random, showNotificationForRandom, randomData, randomMusicVideo, batList, checkIfInList, loading, userName, alreadyInList, addVideoToList, deleteUser, userName, createUser, currentVideo, isLoaded, checkIfLoggedIn, isLoggedIn, setIsLoggedIn }}>
            {props.children}
        </ListContext.Provider>
    )
}

export default ListContextProvider;
