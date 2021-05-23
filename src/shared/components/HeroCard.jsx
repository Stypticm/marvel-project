import React from 'react';

// Material UI
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default function HeroCard({ inputNameOfCharacter }) {
	return (
		<Box>
			{inputNameOfCharacter.map((item) => (
				<Card key={item.id} style={{maxWidth: 345}}>
					<CardActionArea>
						<CardMedia
							component="img"
							alt={item.name}
							height="350"
							image={item.thumbnail.path + '.' + item.thumbnail.extension}
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{item.name}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{item.description}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			))}
		</Box>
	);
}
