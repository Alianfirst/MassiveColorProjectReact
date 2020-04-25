import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import styles from './styles/ColorBoxStyles';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';

class ColorBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			copied: false
		};
		this.ChangeCopyState = this.ChangeCopyState.bind(this);
	}
	ChangeCopyState() {
		this.setState({ copied: true }, () => {
			setTimeout(() => this.setState({ copied: false }), 1500);
		});
	}
	render() {
		const { name, background, moreURL, showingFullPalette, classes } = this.props;
		const { copied } = this.state;
		return (
			<CopyToClipboard text={background} onCopy={this.ChangeCopyState}>
				<div style={{ background }} className={classes.ColorBox}>
					<div
						style={{ background }}
						className={clsx(classes.copyOverlay, {
							[classes.showOverlay]: copied
						})}
					/>
					<div
						className={clsx(classes.copyMsg, {
							[classes.showMsg]: copied
						})}
					>
						<h1>Copied!</h1>
						<p className={classes.contrastClass}>{background}</p>
					</div>
					<div>
						<div className={classes.boxContent}>
							<span className={classes.contrastClass}>{name}</span>
						</div>
						<button className={classes.copyButton}>Copy</button>
					</div>
					{showingFullPalette && (
						<Link to={moreURL} onClick={(e) => e.stopPropagation()}>
							<span className={classes.seeMore}>MORE</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default withStyles(styles)(ColorBox);
