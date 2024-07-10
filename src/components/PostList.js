// src/components/PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;

// src/components/PostItem.js
import React, { useState } from 'react';

const PostItem = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4">
      <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-2">{post.category}</p>
      <p className={`${expanded ? '' : 'line-clamp-3'}`}>{post.information}</p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-600 mt-2"
      >
        {expanded ? 'See Less' : 'See More'}
      </button>
    </div>
  );
};

export default PostItem;