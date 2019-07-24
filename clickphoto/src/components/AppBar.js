import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import CameraIcon from "@material-ui/icons/Camera";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ImagesUploader from "react-images-uploader";
import PersonIcon from "@material-ui/icons/Person";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { blue } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { newpost } from "../actions/postActions";
import { getUsers, getFollowing, createFollower } from "../actions/userActions";
import "react-images-uploader/styles.css";
import "react-images-uploader/font.css";
import "./Dialog.css";
import $ from "jquery";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

function DialogSearch(props) {
  const classes = useStyles();
  const { onClose, create, ...other } = props;

  function handleClose() {
    onClose();
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      fullWidth={true}
      maxWidth={"sm"}
      {...other}
    >
      <DialogTitle id="simple-dialog-title">
        {"Found " + props.users.length + " result(s)"}
      </DialogTitle>
      <List>
        {props.users.map((user, i) => (
          <ListItem key={i}>
            <ListItemAvatar>
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.nome} secondary={"@" + user.username} />
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              disabled={props.usersFollowing.find(
                o => o.username === user.username
              )}
              onClick={() => {
                create(user.id_user);
              }}
              hidden={props.userLogged.id_user == user.id_user}
            >
              Follow
            </Button>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

function ButtonAppBar(props) {
  const { classes, user, logout } = props;
  const [open, setOpen] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [usersFollowing, setUsersFollowing] = React.useState([]);

  useEffect(() => {
    if (user) {
      var body = {
        id_user: user.id_user
      };

      props.getFollowing(body).then(response => {
        //if (usersFollowing.length == 0) {
        setUsersFollowing(response.data);
        //}
      });
    }
  }, [user]);

  function handleClickOpenSearch() {
    setOpenSearch(true);
  }

  const handleCloseSearch = value => {
    setOpenSearch(false);
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function newFollower(id_seguido) {
    var body = {
      id_seguidor: user.id_user,
      id_seguido: id_seguido
    };

    props.createFollower(body).then(response => {
      props.getFollowing(body).then(res => {
        setUsersFollowing(res.data);
        window.location.reload();
      });
    });
  }

  function handleClose() {
    setOpen(false);

    var namePhoto = Math.random()
      .toString(36)
      .substring(2);

    var body = {
      descricao: description,
      localizacao: null,
      foto: namePhoto + ".png",
      id_user: user.id_user
    };

    props.newpost(body).then(response => {
      var input = $("<input>")
        .attr("type", "hidden")
        .attr("name", "foto")
        .val(namePhoto);
      $("#uploadPic").append(input);
      $("#uploadPic").attr(
        "action",
        "http://localhost:3001/posts/uploadPostPic"
      );
      $("#uploadPic").submit();
    });
  }

  function handleCancel() {
    setOpen(false);
  }

  function readURL() {
    var input = $("#imageUpload");
    console.log(input);
    if (input[0].files && input[0].files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $("#imagePreview").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
        $("#imagePreview").hide();
        $("#imagePreview").fadeIn(650);
      };
      reader.readAsDataURL(input[0].files[0]);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar style={{ position: "fixed", top: 0 }}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <CameraIcon style={{ color: "#fff" }} />
          </IconButton>

          <Typography variant="h6" color="inherit">
            ClickPhoto
          </Typography>
          {user ? (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                value={search}
                onChange={event => setSearch(event.target.value)}
                onKeyPress={event => {
                  if (event.which == 13 || event.keyCode == 13) {
                    var body = {
                      texto: event.target.value
                    };
                    props.getUsers(body).then(res => {
                      setUsers(res.data);
                      handleClickOpenSearch();
                      setSearch("");
                    });
                    return false;
                  } else {
                    return true;
                  }
                }}
              />
            </div>
          ) : null}
          <div className={classes.grow} />
          {user ? (
            <div className="col-6 row justify-content-end">
              <div className="col-3">
                <Button
                  color="inherit"
                  className={classes.button}
                  fullWidth
                  onClick={handleClickOpen}
                >
                  <AddIcon className={classes.leftIcon} fontSize="large" />
                  Create Post
                </Button>
              </div>
              <div className="col-2">
                <Button
                  color="inherit"
                  className={classes.button}
                  onClick={logout}
                >
                  <Avatar aria-label="Recipe" className={classes.leftIcon}>
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                  Logout
                </Button>
              </div>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Post</DialogTitle>
        <DialogContent>
          <div class="container">
            <div class="avatar-upload">
              <div class="avatar-edit">
                <form
                  action=""
                  method="POST"
                  encType="multipart/form-data"
                  id="uploadPic"
                >
                  <input
                    type="file"
                    name="file"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={readURL}
                  />
                  <label htmlFor="imageUpload" />
                </form>
              </div>
              <div class="avatar-preview">
                <div
                  id="imagePreview"
                  style={{
                    backgroundImage:
                      'url("https://cdn1.iconfinder.com/data/icons/avatar-1-2/512/Add_User1-512.png")'
                  }}
                />
              </div>
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                rowsMax="4"
                value={description}
                onChange={event => setDescription(event.target.value)}
                className={classes.textField}
                margin="normal"
                // helperText="hello"
                variant="outlined"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {user ? (
        <DialogSearch
          users={users}
          open={openSearch}
          onClose={handleCloseSearch}
          usersFollowing={usersFollowing}
          create={newFollower}
          userLogged={user}
        />
      ) : null}
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users.searchUsers,
  following: state.users.usersFollowing
});
export default connect(
  mapStateToProps,
  { getUsers, getFollowing, newpost, createFollower }
)(withStyles(styles)(ButtonAppBar));
