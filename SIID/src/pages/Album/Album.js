import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { map } from "lodash";
import ListSongs from "../../components/Songs/ListSongs";
import firebase from "../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";

import "./Album.scss";

const db = firebase.firestore(firebase);

function Album(props) {
  const { match, playSong } = props;
  const [album, setAlbum] = useState(null);
  const [albumImage, setAlbumImage] = useState(null);
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    db.collection("albums")
      .doc(match.params.id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setAlbum(data);
      });
  }, [match]);

  useEffect(() => {
    if (album) {
      firebase
        .storage()
        .ref(`album/${album?.banner}`)
        .getDownloadURL()
        .then((url) => {
          setAlbumImage(url);
        });
    }
  }, [album]);

  useEffect(() => {
    if (album) {
      db.collection("artists")
        .doc(album?.artist)
        .get()
        .then((response) => {
          setArtist(response.data());
        });
    }
  }, [album]);

  useEffect(() => {
    if (album) {
      db.collection("songs")
        .where("album", "==", album.id)
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
    }
  }, [album]);

  if (!album || !artist) {
    return <Loader active>Cargando...</Loader>;
  }

  return (
    <div className="album">
      <div className="album__header">
        <HeaderAlbum album={album} albumImage={albumImage} artist={artist} />
      </div>
      <div className="album__songs">
        <ListSongs songs={songs} albumImage={albumImage} playSong={playSong} />
      </div>
    </div>
  );
}

export default withRouter(Album);

function HeaderAlbum(props) {
  const { album, albumImage, artist } = props;

  return (
    <React.Fragment>
      <div
        className="image"
        style={{ backgroundImage: `url('${albumImage}')` }}
      />
      <div className="info">
        <h1>{album.name}</h1>
        <p>
          De <span>{artist.name}</span>
        </p>
      </div>
    </React.Fragment>
  );
}
