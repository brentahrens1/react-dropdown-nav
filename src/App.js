import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

function App() {
  return (
    <div className="App">
      <NavBar>
        <NavItem icon="R" />
        <NavItem icon="R" />
        <NavItem icon="R" />

        <NavItem icon="&#8681;">
          <DropdownMenu />
        </NavItem>
      </NavBar>
    </div>
  );
}

function DropdownMenu() {

  const [ activeMenu, setActiveMenu ] = useState('main');
  const [ menuHeight, setMenuHeight ] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={ () => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{ props.leftIcon }</span>
        { props.children }
        <span className="icon-button">{ props.rightIcon }</span>
      </a>
    )
  }
  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition 
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem 
              rightIcon="&#8680;"
              goToMenu="settings" />
          </div>
        </CSSTransition>

        <CSSTransition 
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        >
          <div className="menu">
            <DropdownItem 
              leftIcon="&#8678;"
              goToMenu="main"
              />
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
          </div>
        </CSSTransition>
    </div>
  )
}

function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        { props.children }
      </ul>
    </nav>
  )
}

function NavItem(props) {
  const [ open, setOpen ] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-btn" onClick={ () => setOpen(!open) }>
        { props.icon }
      </a>
        { open && props.children }
    </li>
  )
}

export default App;
