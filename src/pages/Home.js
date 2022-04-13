import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Comment, FriendsList, Loader, CreatePost, Post } from '../components';
// import { getPosts } from '../api';
import styles from '../styles/home.module.css';
import { useAuth, usePosts } from '../hooks';

const Home = () => {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState([]);

  const auth = useAuth();
  console.log('auth', auth);
  const posts = usePosts();

  //console.log(posts);

  // moving the below logic in hooks index

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();
  //     //console.log('response', response);
  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }
  //     setLoading(false);
  //   };
  //   fetchPosts();
  // }, []);

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Home;
