import React from 'react';
import Attach from './Attach';
import Back from './Back';
import Chat from './Chat';
import Donate from './Donate';
import Foot from './Foot';
import Heart from './Heart';
import Home from './Home';
import Location from './Location';
import Logout from './Logout';
import Menu from './Menu';
import Search from './Search';
import Send from './Send';
import Settings from './Settings';

const HeartFilled = (props: any) => <Heart outline={false} {...props} />;

export default {
  Attach,
  Back,
  Chat,
  Donate,
  Foot,
  Heart,
  HeartFilled,
  Home,
  Location,
  Logout,
  Menu,
  Search,
  Send,
  Settings,
};
