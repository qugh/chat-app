import React from "react";
import { Grid } from "@client/shared/uikit";
import { Auth } from "@client/widgets";

export const SignIn: React.FC = () => {
  return <Grid container sx={{ height: "100vh" }}>
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: "url(https://wallhalla.com/wallpaper/38/variant/preview/2xl)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    />
    <Auth />
  </Grid>;
};