import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { createPost, updatedPost } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const [post, setPost] = useState({
    message: "",
    title: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const selector = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (selector) setPost(selector);
  }, [selector]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatedPost(currentId, { ...post, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...post, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPost({
      message: "",
      title: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.Paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own weather Update
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        className={`${classes.form} ${classes.root}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Your Weather Update</Typography>
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <TextField
          name="message"
          label="Message"
          variant="outlined"
          fullWidth
          value={post.message}
          onChange={(e) => setPost({ ...post, message: e.target.value })}
        />
        <TextField
          name="tags"
          label="Tags"
          variant="outlined"
          fullWidth
          value={post.tags}
          onChange={(e) =>
            setPost({ ...post, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPost({ ...post, selectedFile: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={clear}
        >
          Delete
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
