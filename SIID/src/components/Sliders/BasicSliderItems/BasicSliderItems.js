import React, { useState, useEffect } from "react";
import { map, size } from "lodash";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import firebase from "../../../utils/firebase";
import "firebase/storage";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { CheckCircle, Error } from "@material-ui/icons";

import "./BasicSliderItems.scss";

export default function BasicSliderItems(props) {
  const { title, data, folderImage, urlName } = props;

  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    // slidesToShow: size(data) > 6 ? 6 : size(data),
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    className: "basic-slider-items__list",
  };

  // if (size(data) < 5) {
  //   return null;
  // }

  return (
    <div className="basic-slider-items">
      <h2>{title} </h2>
      <Slider {...settings}>
        {map(data, (item) => {
          return (
            <RenderItem
              key={item.id}
              item={item}
              folderImage={folderImage}
              urlName={urlName}
            />
          );
        })}
      </Slider>
    </div>
  );
}

function RenderItem(props) {
  const [imageUrl, setImageUrl] = useState(null);

  const { item, folderImage, urlName } = props;

  useEffect(() => {
    firebase
      .storage()
      .ref(`${folderImage}/${item.banner}`)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      });
  }, [item, folderImage]);

  const estado = "Ok";
  const useStyles = makeStyles({
    root: {
      minWidth: 200,
      width: 200,
      minHeight: 240,
      Height: "100%",
      margin: "2rem",
    },

    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();
  return (
    <Link to={`/${urlName}/${item.id}`}>
      <div className="basic-slider-items__list-item">
        {/* <div
          className="avatar"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <h3>{item.name}</h3> */}
        <Card className={classes.root}>
          <CardContent id="cardContent">
            <div id="checkIconContainer">
              <Typography
                id="codigoEstado"
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {/* {codigoEstado} */}
                'Cargada'
              </Typography>
              {estado === "Ok" ? (
                <CheckCircle id="checkIcon" />
              ) : (
                <Error id="errorIcon" />
              )}
            </div>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {/* {fileName} */}
              ITF_DIARIO_DFI.CSV
            </Typography>
            <Typography variant="h5" component="h2">
              {/* {fileDescription} */}
              DIARIO SOBRE INSTRUMENTOS DE RENTA FIJA
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {/* {fileCode} */}
              DFX
            </Typography>
            <Typography variant="body2" component="p">
              {/* {user} */}
              Juan Torres
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {/* {empresa} */}
              Banco Internacional
            </Typography>
          </CardContent>
          <CardActions>
            {estado === "Nok" && (
              <Button
                size="small"
                style={{ color: "red" }}
                // onClick={() => {
                //   setShowDetail(true);
                //   setIdCarga(idCarga);
                //   setCardDetailFile(fileName);
                // }}
              >
                Ver Errores
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
    </Link>
  );
}
