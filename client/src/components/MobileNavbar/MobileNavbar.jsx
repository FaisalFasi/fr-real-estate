import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Link } from "react-router-dom";

const links = [
  { path: "/", label: "Home" },
  { path: "/profile", label: "Profile" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/agents", label: "Agents" },
];

const MobileNavbar = ({ anchor, state, toggleDrawer }) => {
  const list = (anchor) => (
    <Box
      sx={{
        width: 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className=" min-h-screen flex flex-col items-center justify-center overflow-auto">
        {links.map(({ path, label }, index) => (
          <li key={index} className="p-4">
            <Link
              to={path}
              className="block w-full text-center font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <div key={anchor}>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </div>
    </div>
  );
};

export default MobileNavbar;
