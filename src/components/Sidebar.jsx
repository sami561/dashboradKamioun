import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  CategoryOutlined,
  Inventory2Outlined,
  CampaignOutlined,
  AccountCircle,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import DomainIcon from "@mui/icons-material/Domain";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import InventoryIcon from "@mui/icons-material/Inventory";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CategoryIcon from "@mui/icons-material/Category";
import { useSelector } from "react-redux";
import ProfileView from "scenes/profile/ProfileView";
const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <Inventory2Outlined />,
  },
  {
    text: "Category",
    icon: <CategoryOutlined />,
  },
  {
    text: "Brand",
    icon: <DomainIcon />,
  },
  {
    text: "Suppliers",
    icon: <AccountBalanceIcon />,
  },

  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Orders",
    icon: <InsertDriveFileIcon />,
  },
  {
    text: "Cart",
    icon: <ShoppingCartOutlined />,
  },

  {
    text: "Management",
    icon: null,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Vendors",
    icon: <Groups2Outlined />,
  },
  {
    text: "Operations Team",
    icon: <Groups2Outlined />,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },

  {
    text: "Marketing",
    icon: null,
  },
  {
    text: "Ads",
    icon: <CampaignOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  // Get user data from Redux state
  const authUser = useSelector((state) => state.auth.user);
  const accountType = authUser?.accountType;
  console.log("🚀 ~ accountType:", accountType);

  const allowedTabs = {
    vendor: [
      "Dashboard",
      "Products",
      "Category",
      "Brand",
      "Suppliers",
      "Orders",
      "Cart",
    ],
    admin: [
      "Dashboard",
      "Customers",
      "Vendors",
      "Operations Team",
      "Admin",
      "Ads",
      "Products",
      "Category",
      "Brand",
      "Suppliers",
      "Orders",
      "Cart",
    ],
    operation: ["Dashboard", "Order Operation"],
  };

  // Add Order Operation tab for operation type
  let filteredNavItems = navItems;
  if (!accountType) {
    filteredNavItems = [];
  } else if (accountType === "operation") {
    filteredNavItems = [
      { text: "Dashboard", icon: <HomeOutlined /> },
      { text: "Order Operation", icon: <InsertDriveFileIcon /> },
    ];
  } else if (allowedTabs[accountType]) {
    filteredNavItems = navItems.filter(
      (item) => !item.icon || allowedTabs[accountType].includes(item.text)
    );
  }

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={require("../assets/kamioun-logo.png")}
                    alt="Kamioun Logo"
                    sx={{
                      width: 100,
                      height: 50,
                      borderRadius: "10px",
                      objectFit: "contain",
                      padding: "4px",
                    }}
                  />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {filteredNavItems.length === 0 ? (
                <Typography sx={{ m: "2.25rem 0 1rem 3rem" }}>
                  Loading menu...
                </Typography>
              ) : (
                filteredNavItems.map(({ text, icon }) => {
                  if (!icon) {
                    return (
                      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = text.toLowerCase().replace(/ /g, "-");

                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })
              )}
            </List>
          </Box>

          <Box bottom="1rem">
            <Divider />
            <Box
              onClick={handleProfileClick}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: theme.palette.secondary[300],
                  borderRadius: "0.5rem",
                },
                transition: "background-color 0.2s ease",
              }}
            >
              <FlexBetween
                textTransform="none"
                gap="1rem"
                m="1.5rem 2rem 0 3rem"
              >
                <Box
                  sx={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                  }}
                >
                  {imageError || !authUser?.profilePhoto ? (
                    <AccountCircle sx={{ fontSize: 40, borderRadius: "50%" }} />
                  ) : (
                    <Box
                      component="img"
                      alt="profile"
                      src={authUser?.profilePhoto || profileImage}
                      height="40px"
                      width="40px"
                      borderRadius="50%"
                      sx={{ objectFit: "cover" }}
                      onError={() => setImageError(true)}
                    />
                  )}
                </Box>
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {authUser
                      ? `${authUser.firstName} ${authUser.lastName}`
                      : "User"}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {authUser?.accountType || "User"}
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px ",
                  }}
                />
              </FlexBetween>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
