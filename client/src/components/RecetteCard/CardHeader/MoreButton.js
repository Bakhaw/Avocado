import React, { Component, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

import UpdateRecetteModal from '../../UpdateRecetteModal';

class MoreButton extends Component {

  state = {
    isDropdownOpen: false,
  }

  toggleDropdown = () => {
    this.setState(state => ({ isDropdownOpen: !state.isDropdownOpen }))
  }

  render() {
    const { item } = this.props;

    return (
      <Fragment>
        <IconButton buttonRef={node => {
          this.anchorEl = node;
        }}
          onClick={this.toggleDropdown}>
          <MoreIcon />
        </IconButton>

        <Popper open={this.state.isDropdownOpen} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <MenuList>
                  <UpdateRecetteModal item={item} />
                  <MenuItem>Supprimer</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Fragment>
    );
  }
}

export default MoreButton;