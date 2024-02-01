import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../redux/actions/postAction";
import LoadIcon from "../../images/loading.gif";
import PostCard from "../../components/PostCard";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const { auth, detailPost } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }));
  }, [dispatch, detailPost, id, auth]);

  useEffect(() => {
    // Check if detailPost has data
    if (detailPost.length > 0) {
      // Find the post with the matching ID
      const foundPost = detailPost.find((post) => post._id === id);
      setPost(foundPost || null);
    }
  }, [detailPost, id]);

  return (
    <div className="posts">
      {post === null && (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      )}

      {post && <PostCard key={post._id} post={post} />}
    </div>
  );
};

export default Post;
