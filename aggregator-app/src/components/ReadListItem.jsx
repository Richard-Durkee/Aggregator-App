import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function ReadListItem(props) {
    return (
        <div class="ReadListCard">
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                        { props.title }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => props.remove()}> Remove </Button>
                </CardActions>
            </Card>
        </div>
    );  
}