import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { ProductCardProps } from '../types/Types'
import '../css/HomePage.css'


function ProductCard(props: ProductCardProps) {

    const { id, title, price, description, category, image, rating } = props.product;

    return (
        <Card className='productcards'>
            <img src={image} width={250} height={250} />
            <CardContent sx={{ height: '200px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title.substring(0, 60)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description.substring(0, 170)}...
                </Typography>
            </CardContent>
            <div>
                <h2 className='price'>{price}$</h2>

            </div>
            <CardActions>
                <Button size="small" variant='outlined' color='info'>Details</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard