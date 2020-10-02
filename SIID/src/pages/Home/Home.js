import React, { useState, useEffect } from "react";
import { map } from "lodash";
import BannerHome from "../../components/BannerHome";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems";
import SongsSlider from "../../components/Sliders/SongsSlider";
import firebase from "../../utils/firebase";
import "firebase/firestore";

import "./Home.scss";

const db = firebase.firestore(firebase);

export default function Home(props) {
  const { playSong } = props;

  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  // console.log(songs);
  useEffect(() => {
    db.collection("artists")
      .get()
      .then((response) => {
        //SE COMENTA PORQUE ESTE MAP DE JAVASCRIPT COLAPSA SI NO HAY DATOS, SE APLICA LIBRERIA LODASH.COM
        // response.docs.map((artist) => {
        //   console.log(artist.data());
        // });
        const arrayArtists = [];
        map(response?.docs, (artist) => {
          //se agrega el signo ? para que solo ejecute en caso de que response tenga datos
          const data = artist.data();
          data.id = artist.id;
          arrayArtists.push(data);
        });
        setArtists(arrayArtists);
      });
  }, []);

  useEffect(() => {
    db.collection("albums")
      .get()
      .then((response) => {
        const arrayAlbums = [];
        map(response?.docs, (album) => {
          const data = album.data();
          data.id = album.id;
          arrayAlbums.push(data);
        });
        setAlbums(arrayAlbums);
      });
  }, []);

  useEffect(() => {
    db.collection("songs")
      .limit(10)
      .get()
      .then((response) => {
        const arraySongs = [];
        map(response?.docs, (song) => {
          const data = song.data();
          data.id = song.id;
          arraySongs.push(data);
        });
        setSongs(arraySongs);
      });
  }, []);

  return (
    <React.Fragment>
      <BannerHome />
      <div className="home">
        <BasicSliderItems
          title="Archivos Cargados"
          data={artists}
          folderImage="artist"
          urlName="artist"
        />
        <BasicSliderItems
          title="Interfaces Generadas"
          data={albums}
          folderImage="album"
          urlName="album"
        />
        <BasicSliderItems
          title="Descarga Interfaces"
          data={albums}
          folderImage="album"
          urlName="album"
        />
        {/* <SongsSlider title="Descarga Interfaces" data={songs} /> */}
      </div>
    </React.Fragment>
  );
}
