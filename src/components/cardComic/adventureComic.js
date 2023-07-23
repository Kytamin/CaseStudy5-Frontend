import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';

  function Adventure() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        axios.get("http://localhost:8080/api/listadventure").then(res=>{
             setData(res.data)
        })
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        }}>
            {data.map(item => (
                <a href={'/detailComic/'+item._id} style={{ textDecoration: "none", color: "inherit" }}>
                    <Card sx={{maxWidth: 250, minWidth: 250, margin: 1}} variant="null" key={item.id}>
                <CardMedia
                    sx={{
                        maxHeight: 400,
                        height: 999,
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px'
                    }} // check later
                    image={item.avatar}
                    title="green iguana"
                    variant="outlined"
                />
                <CardContent sx={{padding: 0, marginLeft: 2, flexGrow: 1}}>
                    <Typography gutterBottom variant="h7" component="div">
                        <p href="" style={{ textDecoration: "none", color: "inherit" }}>{item.name}</p>
                    </Typography>
                </CardContent>
                <CardContent sx={{padding: 0, marginLeft: 2, flexGrow: 1}}>
                    <p>{item.category}</p>
                </CardContent>
            </Card>
            </a>
            ))}
        </div>
    );
}

export default Adventure