import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export default function PaletteMetaForm(props) {
	const { palettes, handleSubmit, hideForm } = props;
	const [
		newPaletteName,
		setPaletteName
	] = React.useState('');
	const [
		stage,
		setStage
	] = React.useState('form');

	useEffect(() => {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
			return palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase() && value.toLowerCase() !== 'new'
			);
		});
	});

	const handleChange = (evt) => {
		const { value } = evt.target;
		setPaletteName(value);
	};

	const showEmojiPicker = () => {
		setStage('emoji');
	};

	const savePalette = (emoji) => {
		const newPalette = { paletteName: newPaletteName, emoji: emoji.native };
		handleSubmit(newPalette);
		setStage('');
	};

	return (
		<div>
			<Dialog open={stage === 'emoji'} onClose={hideForm}>
				<DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
				<Picker title="Pick a palette emoji" onSelect={savePalette} theme="auto" />
			</Dialog>
			<Dialog open={stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
				<ValidatorForm onSubmit={showEmojiPicker}>
					<DialogContent>
						<DialogContentText>
							Please enter a name for your new beautiful palette. Make sure it's unique!
						</DialogContentText>

						<TextValidator
							label="Palette Name"
							name="paletteName"
							value={newPaletteName}
							onChange={handleChange}
							fullWidth
							margin="normal"
							validators={[
								'required',
								'isPaletteNameUnique'
							]}
							errorMessages={[
								'Enter Palette Name',
								'Name already used'
							]}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={hideForm} color="primary">
							Cancel
						</Button>
						<Button variant="contained" type="submit" color="primary">
							Save Palette
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		</div>
	);
}
