import React , {ReactElement } from 'react'
import {  DirayList } from '../../types/home'
import ListItem from '../ListItem';

function List({ list = [] } : Omit<DirayList,"likeCount">) :ReactElement { 
  return (
  <>
    {list.map(({ createdAt, emotion, content, id})=>(
        <ListItem
            key={`${createdAt}_${id}`}
            createdAt={createdAt}
            emotion={emotion}
            content={content}
            id={id}
        />))}
    </>)
}

export default List;

