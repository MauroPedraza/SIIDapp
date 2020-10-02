import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import "firebase/storage";

import "./BannerHome.scss";

export default function BannerHome() {
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref("other/banner-home.jpg")
      .getDownloadURL()
      .then((url) => {
        setBannerUrl(url);
      })
      .catch(() => {});
  }, []);

  if (!bannerUrl) {
    return null;
  }

  return (
    // <div
    //   className="banner-home"
    //   style={{ backgroundImage: `url('${bannerUrl}')` }}
    // />
    <div style={{ marginLeft: "2rem" }}>
      <h2>Banco Internacional</h2>
      <h3>Fecha Proceso: 02.10.2020</h3>
    </div>
  );
}
