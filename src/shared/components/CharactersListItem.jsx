import React, { useState, useEffect, useRef } from 'react';
import CryptoJS from 'crypto-js';

// Data
import { KEYS, PUBLIC_KEY, PRIVATE_KEY } from '../../shared/config';

// Components
import Loader from './Loader';
import HeroCard from './HeroCard';

// Material UI
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Divider from '@material-ui/core/Divider';

const CharactersListItem = () => {
	const [ data, setData ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ number, setNumber ] = useState(1);
	const [ numberInButton, setNumberInButton ] = useState(1);
	const [ inputNameOfCharacter, setinputNameOfCharacter ] = useState([]);

	// useEffect(() => {}, [ numberInButton ]);

	const getCharacters = () => {
		setLoading(true);

		let md5Hash = CryptoJS.MD5(`${number}${PRIVATE_KEY}${PUBLIC_KEY}`);

		const GENERAL_KEY = `${KEYS.BASE_URL}ts=${number}&limit=${number}&apikey=${PUBLIC_KEY}&hash=${md5Hash}`;

		fetch(`${GENERAL_KEY}`).then((response) => response.json()).then((data) => {
			let characters = data.data.results;
			setLoading(false);
			setData(characters);
		});
	};

	const setNumberCharacters = (event) => {
		setNumberInButton(event.target.value);
		setNumber(event.target.value);
	};

	const inputName = useRef('');
	const searchCharacter = () => {
		setLoading(true);
		let nameOfCharacter = inputName.current.value.trim();

		let splitName = nameOfCharacter.split('');
		let gapName = [];

		for (let i = 0; i < splitName.length; i++) {
			if (splitName[i] === ' ') {
				gapName.push('%20');
			} else {
				gapName.push(splitName[i]);
			}
		}
		let finalName = gapName.join('');

		let md5Hash = CryptoJS.MD5(`${number}${PRIVATE_KEY}${PUBLIC_KEY}`);

		const GENERAL_KEY = `${KEYS.BASE_URL}ts=${number}&name=${finalName}&apikey=${PUBLIC_KEY}&hash=${md5Hash}`;

		fetch(`${GENERAL_KEY}`).then((response) => response.json()).then((data) => {
			let characters = data.data.results;
			setLoading(false);
			setinputNameOfCharacter(characters);
		});
	};

	const clearArea = () => {
		setinputNameOfCharacter([])
		setData([])
	}

	return (
		<Box minHeight="100vh">
			<Box display="flex" justifyContent="center">
				<Typography variant="h2" gutterBottom>
					Marvel Heroes
					<Divider />
				</Typography>
			</Box>

			<Box display="flex" justifyContent="center">
				<Box>
					<Box display="flex" justifyContent="center">
						<Box>
							<TextField
								id="standard-basic"
								label="Enter name of hero"
								inputRef={inputName}
								type="text"
							/>
							<Button variant="contained" color="primary" onClick={searchCharacter}>
								Search Characters
							</Button>
						</Box>
					</Box>
					<Box display="flex" justifyContent="center" p="2rem">
						<Box pr="2rem">
							<Button variant="contained" onClick={getCharacters}>
								{`Get ${numberInButton} charaters`}
							</Button>
						</Box>
						<Box pr="2rem">
							<FormControl>
								<InputLabel id="number-of-characters-label">Number</InputLabel>
								<Select
									labelId="number-of-characters-label"
									id="number-of-characters"
									value={number}
									onChange={setNumberCharacters}
								>
									<MenuItem value={1}>One</MenuItem>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={50}>Fifthy</MenuItem>
									<MenuItem value={100}>Hundred</MenuItem>
								</Select>
								<FormHelperText>Number of Characters</FormHelperText>
							</FormControl>
						</Box>
						<Box>
							<Button variant="contained" onClick={clearArea}>
								Clear area
							</Button>
						</Box>
					</Box>
					<Container>
						{loading ? <Loader /> : <Box>{data.map((item) => <p key={item.id}>{item.name}</p>)}</Box>}
					</Container>
					<Container>
						{loading ? <Loader /> : <HeroCard inputNameOfCharacter={inputNameOfCharacter} />}
					</Container>
				</Box>
			</Box>
		</Box>
	);
};

export default CharactersListItem;
