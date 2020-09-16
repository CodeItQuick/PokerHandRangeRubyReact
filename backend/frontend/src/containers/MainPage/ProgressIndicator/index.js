import React, { memo, useState, useEffect } from 'react';
import { Step, Icon, Button } from 'semantic-ui-react';
import { initIsIP } from './action';
import { useDispatch } from 'react-redux';
import {
	makeSelectIsIp,
	makeSelectRangeRepoIP,
	makeSelectRangeRepoOOP,
	makeSelectRange,
	makeSelectStreet
} from './selector';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import useInjectReducer from '../../../HOC/useInjectReducer';

//TODO: Note testin code for this code is elsewhere
export const assignPositions = (rangeRepoIP, rangeRepoOOP, selectedRanges, isIP) => {
	let newRanges, newRangeIP, newRangeOOP;
	if (isIP) {
		newRanges = copyRangesFrom(rangeRepoIP);
		newRangeIP = copyRangesFrom(rangeRepoIP);
		newRangeOOP = copyRangesFrom(selectedRanges);
	} else {
		newRanges = copyRangesFrom(rangeRepoOOP);
		newRangeIP = copyRangesFrom(selectedRanges);
		newRangeOOP = copyRangesFrom(rangeRepoOOP);
	}
	return [ newRangeIP, newRangeOOP, newRanges ];
};

const copyRangesFrom = (copyRange) => copyRange.map((RangeObj) => RangeObj.getRangesObject());

export const handsInRange = (inpRange, street) => {
	if (inpRange.length === 0) return false;
	const handsInRange = inpRange.filter((rangeObject) => rangeObject.filterForHandsInRange(street).length > 0);
	const isHandsSelected = handsInRange.length > 0;

	return isHandsSelected;
};

const key = 'global';
const ProgressIndicator = ({ street, isIP, rangeRepoIP, rangeRepoOOP, selectedRanges }) => {
	const dispatch = useDispatch();
	useInjectReducer({ key, reducer });
	const [ handsIPUsed, setHandsIPUsed ] = useState(handsInRange(rangeRepoIP, street));
	const [ handsOOPUsed, setHandsOOPUsed ] = useState(handsInRange(rangeRepoOOP, street));

	useEffect(
		() => {
			setHandsIPUsed(handsInRange(isIP ? selectedRanges : rangeRepoIP, street));
			setHandsOOPUsed(handsInRange(!isIP ? selectedRanges : rangeRepoOOP, street));
		},
		[ selectedRanges, rangeRepoIP, rangeRepoOOP, street, isIP ]
	);

	const onChangePosition = (e, { value }) => {
		let [ newRangeIP, newRangeOOP, newRanges ] = assignPositions(rangeRepoIP, rangeRepoOOP, selectedRanges, value);

		dispatch(
			initIsIP({
				position: value,
				newRangeIP,
				newRangeOOP,
				newRanges
			})
		);
	};

	return (
		<Step.Group fluid>
			<Step completed={handsIPUsed}>
				<Icon name="thumbs down" color="red" />
				<Step.Content>
					<Step.Description>
						<Button name="Position" value={true} active={isIP} inverted primary onClick={onChangePosition}>
							<strong>In Position</strong>
						</Button>
					</Step.Description>
				</Step.Content>
			</Step>
			<Step completed={handsOOPUsed}>
				<Icon name="thumbs down" color="red" />
				<Step.Content>
					<Step.Description>
						<Button
							name="Position"
							value={false}
							active={!isIP}
							inverted
							primary
							onClick={onChangePosition}
						>
							<strong>Out Of Position</strong>
						</Button>
					</Step.Description>
				</Step.Content>
			</Step>
		</Step.Group>
	);
};

const mapStateToProps = () => {
	const getIsIp = makeSelectIsIp();
	const getStreet = makeSelectStreet();
	const getRangeRepoIP = makeSelectRangeRepoIP();
	const getRangeRepoOOP = makeSelectRangeRepoOOP();
	const getSelectedRanges = makeSelectRange();

	const mapState = (state) => {
		return {
			isIP: getIsIp(state),
			Street: getStreet(state),
			rangeRepoIP: getRangeRepoIP(state),
			rangeRepoOOP: getRangeRepoOOP(state),
			selectedRanges: getSelectedRanges(state)
		};
	};
	return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ProgressIndicator);
