import React, { useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import useStyles from './styles/ColorPickerFormStyles';

export default function ColorPickerForm(props) {
	const classes = useStyles();
	const { addNewColor, paletteIsFull, colors } = props;
	const [
		currentColor,
		setCurrentColor
	] = React.useState('purple');
	const [
		newColorName,
		setColorName
	] = React.useState('');

	useEffect(() => {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
			return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase());
		});
		ValidatorForm.addValidationRule('isColorUnique', () => {
			return colors.every(({ color }) => color !== currentColor);
		});
	});

	const handleChange = (evt) => {
		const { value } = evt.target;
		setColorName(value);
	};

	const handleSubmit = () => {
		const newColor = {
			color: currentColor,
			name: newColorName
		};
		addNewColor(newColor);
		setColorName('');
	};

	const updateCurrentColor = (newColor) => {
		setCurrentColor(newColor.hex);
	};

	return (
		<div>
			<ChromePicker color={currentColor} onChangeComplete={updateCurrentColor} className={classes.picker} />
			<ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
				<TextValidator
					value={newColorName}
					name="colorName"
					className={classes.colorNameInput}
					placeholder="Color Name"
					onChange={(e) => handleChange(e)}
					margin="normal"
					variant="filled"
					validators={[
						'required',
						'isColorNameUnique',
						'isColorUnique'
					]}
					errorMessages={[
						'Enter a color name',
						'Color name must be unique',
						'Color already used'
					]}
				/>
				<Button
					variant="contained"
					type="submit"
					color="primary"
					className={classes.addColor}
					disabled={paletteIsFull}
					style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
				>
					{paletteIsFull ? 'Palette Full' : 'Add Color'}
				</Button>
			</ValidatorForm>
		</div>
	);
}
