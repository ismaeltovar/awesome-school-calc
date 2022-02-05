import React from "react"; 
import { NavLink } from "react-router-dom";
import Switch from 'react-switch';
import { ThemeContext } from "./themeContext";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Container } from ".";

const Header = () => {
  return (
    <ThemeContext.Consumer>
        {({theme, toggleTheme}) => {
          console.log({theme, toggleTheme});
        return (
          <header>
            <Container id="header">
              <NavLink to="/">
                <h1 id='header-txt' className={theme}>Awesome School Calc  <sup id='header-sup-txt' className={theme}>v1.0.0</sup></h1>
              </NavLink>
              <label>
                <Switch onChange={toggleTheme} checked={theme === 'light' ? true: false} onColor='#e6e6e6' offColor='#646464' checkedIcon={<IoSunny/>} uncheckedIcon={<IoMoon/>}/>
              </label>
            </Container>
          </header>
        )}}
      </ThemeContext.Consumer>
  );
}

export default Header;