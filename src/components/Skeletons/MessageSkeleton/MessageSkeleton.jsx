import React from 'react';
import  Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MessageSkeleton = ({style}) => {
  return (
    <div style={style}>
        <Skeleton baseColor="#908d8d" highlightColor="#444" circle width={60} height={60}/>
        <Skeleton baseColor="#908d8d" highlightColor="#444" width={300} height={45} style={{margin: "0 20px"}}/>
    </div>
  )
}

export default MessageSkeleton