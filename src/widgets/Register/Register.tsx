import React from "react";
import { Avatar, Box, Button, Grid, Input, Link, Paper, Typography, Icons } from "shared/uikit";


export const Register: React.FC = () => {
  return <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <Icons.LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box
        component="form"
        noValidate
        // onSubmit={() => {
        // }}
        sx={{ mt: 1 }}>
        <Input
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Input
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {/*<FormControlLabel*/}
        {/*  control={<Checkbox value="remember" color="primary" />}*/}
        {/*  label="Remember me"*/}
        {/*/>*/}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/sign-in" variant="body2">
              Already have an account?
            </Link>
          </Grid>
        </Grid>
        {/*// <Copyright sx={{ mt: 5 }} />*/}
      </Box>
    </Box>
  </Grid>;
};