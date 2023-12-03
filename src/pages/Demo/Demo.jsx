import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Demo = () => {
  const singlePost = useLoaderData();
  const {_id, author, authorImage, tags, time, title, description } = singlePost || {};
  console.log(singlePost);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Demo;