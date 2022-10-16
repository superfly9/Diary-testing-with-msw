import React , {ReactElement } from 'react'
import {  DirayList } from '../../types/home'
import ListItem from '../ListItem';

function List({ list } : DirayList) :ReactElement { 
  return (
  <>
    {list.map(({createdAt, emotion, content, title, id})=>(
        <ListItem
            key={createdAt}
            createdAt={createdAt}
            emotion={emotion}
            content={content}
            title={title}
            id={id}
        />))}
    </>)
}

export default List;

