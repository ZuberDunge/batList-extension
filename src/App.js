/*global chrome*/
import './App.css';
import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader'
import { useContext } from "react"
import { ListContext } from './context/data';
import YTLogo from "./assets/Youtube.png"
import { AuthContext } from './context/authContext';
import { getAuth } from "firebase/auth";

function App(props) {




  useEffect(() => {

    let newUserID = JSON.parse(localStorage.getItem('userID'))
    const auth = getAuth();
    const user = auth.currentUser;

    if (user || newUserID == null) {
      localStorage.setItem("userID", JSON.stringify(user.uid))
    }
  }, [])
  const { showNotificationForRandom, randomData, loading, random, stopLoading, randomMusicVideo, addVideoToList, checkIfInList, deleteUser, alreadyInList, currentVideo, isLoaded, batList, userName, } = useContext(ListContext);
  const { logout } = useContext(AuthContext)
  const [search, setSearch] = useState("")

  const searchFunction = (e) => {
    setSearch(e.target.value);
  };

  const searchResult = batList.filter((item) =>
    item._document.data.value.mapValue.fields.title.stringValue.toLowerCase().includes(search.toLowerCase())
  );


  function ascendingOrder(a, b) {
    if (a._document.data.value.mapValue.fields.title.stringValue < b._document.data.value.mapValue.fields.title.stringValue) {
      return -1;
    }
    if (a._document.data.value.mapValue.fields.title.stringValue > b._document.data.value.mapValue.fields.title.stringValue) {
      return 1;
    }
    return 0;
  }

  function desscendingOrder(a, b) {
    if (b._document.data.value.mapValue.fields.title.stringValue < a._document.data.value.mapValue.fields.title.stringValue) {
      return -1;
    }
    if (b._document.data.value.mapValue.fields.title.stringValue > a._document.data.value.mapValue.fields.title.stringValue) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    if (isLoaded) {
      checkIfInList()
    }
  }, [isLoaded])


  return (

    <div>
      <div className="nav-section bat-flex bat-align-center bat-justify-between">
        <h4 className='bat-m-r-8px'>Hey, {userName[0] != null ? userName[0]._document.data.value.mapValue.fields.username.stringValue : "Human"}!👋🏻 {random[Math.floor(Math.random() * random.length)]} 🌻</h4>
        <button onClick={logout} class="bat-btn bat-br-3px bat-btn-primary">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
      <header className="App-header">


        {isLoaded ?
          <>
            <div class="bat-card bat-card-horizontal card-with-dis bat-border-1">
              <img
                src={currentVideo.snippet.thumbnails.medium.url}
                alt="batman"
              />
              <div class="bat-flex bat-flx-dir-col bat-justify-between bat-m-r-8px">
                <div class="fs-1r bold-600 .bat-primary-clr-x">
                  {currentVideo.snippet.title}
                </div>
                <div class="bat-flex width-100 bat-align-center bat-justify-between bat-m-r-8px">
                  <button class="bat-btn bat-br-3px bat-btn-with-icon" onClick={() => addVideoToList()}>
                    <i class="far fa-heart"></i> <div>{alreadyInList ? "Added to the List" : "Add to watchList"}</div>
                  </button>
                  <i class="fas fa-share-alt"></i>
                </div>
              </div>
            </div></> : null
        }
      </header>

      {loading ?
        (batList.length > 0 ?
          <>
            <div className="bat-flex bat-justify-between bat-align-center" style={{ marginTop: "0.5rem" }}>
              <h3>Your WatchList 🌻</h3>
              <a
                href={`https://www.youtube.com/watch?v=${randomData.resourceId.videoId}`}
                target="_blank"
                class="bat-btn bat-br-3px bat-fw-600 bat-fs-14px bat-btn-with-icon random-btn"
                onClick={() => showNotificationForRandom(randomData)}
              >
                <span>Play A Random Song </span> <i class="fas fa-external-link-alt"></i>
              </a>
            </div>

            <div className='relative'><input className='searchbar' type="text" value={search} onChange={searchFunction}
              placeholder={batList[Math.floor(Math.random() * batList.length)] != undefined ? `Try "${batList[Math.floor(Math.random() * batList.length)]._document.data.value.mapValue.fields.title.stringValue}"` : "Search here"}
            />
              <i class="fas fa-search"></i>
            </div>
            {searchResult.map(item =>
              <>
                <div class="bat-card bat-card-horizontal card-with-dis bat-border-1">
                  <img
                    src={item._document.data.value.mapValue.fields.img.stringValue}
                    alt="batman"
                  />
                  <div class="bat-flex width-100 bat-flx-dir-col bat-justify-between bat-m-r-8px">
                    <div class="fs-1r bold-600 .bat-primary-clr-x">
                      {item._document.data.value.mapValue.fields.title.stringValue}
                    </div>
                    <div class="bat-badge bold-600">Sold Out</div>


                    <div class="bat-flex bat-align-center bat-justify-between bat-m-r-8px">
                      <a href={`https://www.youtube.com/watch?v=` + item._document.data.value.mapValue.fields.link.stringValue} target="_blank" class="bat-btn bat-br-3px bat-btn-with-icon">
                        <span>Watch now</span> <i class="fas fa-external-link-alt"></i>
                      </a>

                      <div onClick={() => deleteUser(item.id)} >
                        <i class="fas fa-trash"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </>)}
          </> :
          <div className='bat-m-tb-2r'>
            <img src={YTLogo} className="ty-logo" alt="" /> <h3 className='bat-txt-center'>
              There are no videos in the watchlist yet, start adding!
            </h3>
            <a
              href={`https://www.youtube.com/watch?v=${randomData.resourceId.videoId}`}
              target="_blank"
              class="bat-btn bat-flex bat-justify-center bat-br-3px bat-text-center bat-fw-600 bat-fs-14px bat-btn-with-icon random-btn"
              onClick={() => showNotificationForRandom(randomData)}
            >
              <span>Play A Random Song </span> <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        ) :
        <ContentLoader
          viewBox="0 0 400 200"
          width={400}
          height={200} backgroundColor='#ffffff14' foregroundColor='#ffffff64'
          title="Loading news..."
          {...props}
        >
          <rect x="42.84" y="9.93" rx="5" ry="5" width="143.55" height="86.59" />
          <rect x="192.84" y="9.67" rx="0" ry="0" width="148.72" height="12.12" />
          <rect x="192.84" y="25.67" rx="0" ry="0" width="89" height="9" />

          <rect x="42.84" y="107" rx="5" ry="5" width="143.55" height="86.59" />
          <rect x="192.84" y="107" rx="0" ry="0" width="148.72" height="12.12" />
          <rect x="192.84" y="123" rx="0" ry="0" width="89" height="9" />
        </ContentLoader>}
    </div>
  );
}

export default App;


