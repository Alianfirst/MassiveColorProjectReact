import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import Button from '@material-ui/core/Button';
import arrayMove from 'array-move';
import seedColors from './seedColors';
import ColorPickerForm from './ColorPickerForm';
import useStyles from './styles/NewPaletteFormStyles';

export default function NewPaletteForm(props, { maxColors = 20 }) {
	const classes = useStyles();
	const [
		open,
		setOpen
	] = React.useState(false);
	const [
		colors,
		setNewColors
	] = React.useState(seedColors[0].colors);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const addNewColor = (newColor) => {
		setNewColors([
			...colors,
			newColor
		]);
	};

	const handleSubmit = (newPalette) => {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
		newPalette.colors = colors;
		props.savePalette(newPalette);
		props.history.push('/');
	};
	const removeColor = (colorName) => {
		setNewColors(colors.filter((color) => color.name !== colorName));
	};

	const onSortEnd = ({ oldIndex, newIndex }) => {
		setNewColors(arrayMove(colors, oldIndex, newIndex));
	};

	const clearColors = () => {
		setNewColors([]);
	};

	const addrandomColor = () => {
		let source = props.palettes.length > 0 ? props.palettes : seedColors;
		const allColors = source.map((p) => p.colors).flat();
		let rand;
		let randColor;
		let isDuplicateColor = true;
		while (isDuplicateColor) {
			rand = Math.floor(Math.random() * allColors.length);
			randColor = allColors[rand];
			isDuplicateColor = colors.some((color) => color.name === randColor.name);
		}
		setNewColors([
			...colors,
			randColor
		]);
	};

	const paletteIsFull = colors.length >= maxColors;

	return (
		<div className={classes.root}>
			<PaletteFormNav
				open={open}
				handleDrawerOpen={handleDrawerOpen}
				handleSubmit={handleSubmit}
				palettes={props.palettes}
			/>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<div className={classes.container}>
					<Typography variant="h4" gutterBottom>
						Design Your Palette
					</Typography>
					<div className={classes.buttons}>
						<Button variant="contained" color="secondary" className={classes.button} onClick={clearColors}>
							Clear Palette
						</Button>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							disabled={paletteIsFull}
							onClick={addrandomColor}
						>
							Random Color
						</Button>
					</div>
					<ColorPickerForm paletteIsFull={paletteIsFull} addNewColor={addNewColor} colors={colors} />
				</div>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.drawerHeader} />
				<DraggableColorList
					colors={colors}
					removeColor={removeColor}
					axis="xy"
					onSortEnd={onSortEnd}
					distance={20}
				/>
			</main>
		</div>
	);
}
