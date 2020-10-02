import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import Slider from "react-slick";
import { map } from "lodash";
import { Link } from "react-router-dom";
import firebase from "../../../utils/firebase";
import "firebase/firestore";
import "firebase/storage";

import "./SongsSlider.scss";

const db = firebase.firestore(firebase);

export default function SongsSlider(props) {
  const { title, data, playSong } = props;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    // slidesToshow: size(data) > 6 ? 6 : size(data),
    slidesToScroll: 1,
    centerMode: true,
    className: "songs-slider__list",
  };

  // if(size(data)<5){
  //    return null
  // }

  return (
    <div className="songs-slider">
      <h2>{title}</h2>
      <Slider {...settings}>
        {map(data, (item) => (
          <Song key={item.id} item={item} playSong={playSong} />
        ))}
      </Slider>
    </div>
  );
}

function Song(props) {
  const { item, playSong } = props;
  const [banner, setBanner] = useState(null);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    db.collection("albums")
      .doc(item.album)
      .get()
      .then((response) => {
        const albumTemp = response.data();
        albumTemp.id = response.id;
        setAlbum(albumTemp);
        getImage(albumTemp);
      });
  }, [item]);

  const getImage = (album) => {
    firebase
      .storage()
      .ref(`album/${album.banner}`)
      .getDownloadURL()
      .then((bannerUrl) => {
        setBanner(bannerUrl);
      });
  };

  const onPlay = () => {
    playSong(banner, item.name, item.fileName);
  };

  return (
    <div className="songs-slider__list-song">
      <div
        className="avatar"
        style={{ backgroundImage: `url('${banner}')` }}
        onClick={onPlay}
      >
        <Icon name="play circle outline" />
      </div>
      <Link to={`/album/${album?.id}`}>
        <h3>{item.name}</h3>
      </Link>
    </div>
  );
}
