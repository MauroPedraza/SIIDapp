import React, { useState, useEffect } from "react";
import { Menu, Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../utils/firebase";
import "firebase/auth";
import UserImage from "../../assets/png/user.png";
import { isUserAdmin } from "../../utils/Api";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import "./TopBar.scss";

function TopBar(props) {
  const { user, location, history } = props;
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  useEffect(() => {
    isUserAdmin(user.uid).then((response) => {
      setUserAdmin(response);
    });
  }, [user]);

  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  const goBack = () => {
    history.goBack();
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <Icon name="angle left" onClick={goBack} />
      </div>
      <div className="top-bar__middle">
        <Menu className="menu-top" inverted>
          <div className="options">
            <Menu.Item
              as={Link}
              to="/"
              active={activeMenu === "/"}
              onClick={handlerMenu}
            >
              <Icon name="home" /> Inicio
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/artists"
              active={activeMenu === "/artists"}
              onClick={handlerMenu}
            >
              <Icon name="user" /> Archivos Cargados
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/albums"
              active={activeMenu === "/albums"}
              onClick={handlerMenu}
            >
              <Icon name="window maximize outline" /> Consultar Interfaces
            </Menu.Item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          {userAdmin && (
            <div className="footer">
              <Menu.Item>
                <Icon name="plus square outline" />
              </Menu.Item>
              <Menu.Item>
                <Icon name="plus square outline" />
              </Menu.Item>
              <Menu.Item>
                <Icon name="plus square outline" />
              </Menu.Item>
            </div>
          )}
        </Menu>
      </div>
      <div className="top-bar__right">
        <Link to="/settings">
          <Image src={user.photoURL ? user.photoURL : UserImage} />
          {user.displayName}
        </Link>
        <Icon name="power off" onClick={logout} />
      </div>
    </div>
  );
}

export default withRouter(TopBar);
