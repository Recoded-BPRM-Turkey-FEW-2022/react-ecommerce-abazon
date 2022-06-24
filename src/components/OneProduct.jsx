
//We have to know how to pass the props to use them inside the fuction
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useMutation } from 'react-query'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const OneProduct = ({ ProductInfo}) => {
  const [quantity, setQuantity] = useState(1);
  const postData = useMutation((Addproduct)=>{
    console.log(Addproduct)
    return fetch('http://localhost:3000/cart', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(Addproduct)
})
  })
  return (
    <Grid p={6}  style={{ height: "100%", }} container spacing={2} >
    <Grid  sx={{}} item xs={12} md={3}>
      <Item sx={{pb:"0px"}} style={{height: "200px", backgroundImage: `url(${ProductInfo.images})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'}}></Item>
      <Grid sx={{pb:"0px"}} item xs={12}  md={12}>
    <Button  variant="contained" sx={{m:"10px", width:"90%" , background: '#ff9e80' , color: '#ffffff'}} onClick={()=>{postData.mutate({
          id : ProductInfo.id,
          title : ProductInfo.title,
          price : ProductInfo.price,
          image : ProductInfo.images[0],
          quantity : quantity,
          total : ProductInfo.price * parseInt(quantity)
        })}}>Add to cart</Button>
         <TextField sx={{ml:3}} type="number" value={quantity}  InputProps={{
        inputProps: { 
          min:1
        }
    }} onChange={(e)=>{setQuantity(e.target.value)}}>

        </TextField>
    </Grid>
    </Grid>
    <Grid  item xs={12}  md={8}>
      <Item sx={{}} style={{height: "80%"}}>

        <h1>{ProductInfo.title}</h1>
        <div style={{m:"10px", textAlign: 'left'}}>{ProductInfo.description}</div>
        <Item variant="contained" sx={{m:"20px", textAlign: "left"}} >Price: {ProductInfo.price} $</Item>
      </Item>
    </Grid>
      </Grid>)
}
export default OneProduct;