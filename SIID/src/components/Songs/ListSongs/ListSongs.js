import React from "react";
import { Table, Icon } from "semantic-ui-react";
import { map } from "lodash";

import "./ListSongs.scss";

export default function ListSongs(props) {
  const { songs, albumImage, playSong } = props;

  //   console.log(props);

  return (
    <Table inverted className="list-songs">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Titulo</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(songs, (song) => (
          <Song
            key={song.id}
            song={song}
            albumImage={albumImage}
            playSong={playSong}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

function Song(props) {
  const { song, albumImage, playSong } = props;

  const onPlay = () => {
    playSong(albumImage, song.name, song.fileName);
  };

  console.log(props);
  return (
    <Table.Row onClick={onPlay}>
      <Table.Cell collapsing>
        <Icon name="play circle outline" />
      </Table.Cell>
      <Table.Cell>{song.name}</Table.Cell>
    </Table.Row>
  );
}
