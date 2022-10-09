import React , {ReactElement } from 'react'
import {  DirayList } from '../../types/home'
import ListItem from '../ListItem';

function List({ list } : DirayList) :ReactElement { 
  return (
  <>
    {list.map(({createdAt, image, name, title, id})=>(
        <ListItem
            key={createdAt}
            createdAt={createdAt}
            image={image}
            name={name}
            title={title}
            id={id}
        />))}
    </>)
}

export default List;