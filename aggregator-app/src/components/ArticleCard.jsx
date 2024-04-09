import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function ArticleCard(props) {
    return (
        <div class="ArticleCard">
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                component="img"
                image={ props.image }
                title= { props.title }
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    { props.title }
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
                    By: { props.author }
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
                    Date: { props.date }
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
                    Word Count: { props.wordCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    { props.subtitle }
                </Typography>
                <Typography variant="body2" color="text.tertiary" fontWeight={100}>
                    Link: { props.link}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => props.add()}>Add to Reading List</Button>
            </CardActions>
            </Card>
        </div>
    );  
}