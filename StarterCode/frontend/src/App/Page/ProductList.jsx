import './ProductList.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { MdDelete } from "react-icons/md";
import axios from 'axios'
const ProductList = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    fetchProducts();
  }, [])

  //implement the get products function
  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products').then(
      res => setList(res.data)
    )
 
  };

  //implement the delete function
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`).then(
      setList(list.filter((card) => card.id !== id))
    )
  };

  return (
    <div className='mainContainer'>
      <span className='projectTitle'>Simple Card List</span>
      <div className='listContainer'>
          {list.map((card) => {
            return (
              <Card sx={{ maxWidth: 345, width:'300px',height:'270px'}} key={card.id}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.imageUrl}
                    alt="green iguana"
                  />
                  <span className='delete' onClick={() => handleDelete(card.id)}><MdDelete /></span>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize:'18px' }}>
                      ${card.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      ${card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
      </div>
    </div>
  );
};

export default ProductList;