import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Board from './Board';
import { useDispatch } from 'react-redux';
import BoardLegend from './BoardLegend/BoardLegend';
import {
	makeSelectRange,
	makeSelectSelectedStreet,
	makeSelectMode,
	makeSelectDeadcards,
	makeSelectRangeRepoIP,
	makeSelectRangeRepoOOP
} from './selectors';
import { initSetHandRangeSelect, initSetHandRange } from './actions';

import reducer from './reducer';
import { useInjectReducer } from '../../HOC/useInjectReducer';
import { useInjectSaga } from '../../HOC/injectSaga';
import saga from './saga';

import InputForm from './InputForm';
import styled from 'styled-components';

import { mapNewHandRange } from './stateRangeFunctions';
import ProgressIndicator from './ProgressIndicator';
import SuitSelector from './SuitSelector';
import CurrentRanges from './CurrentRanges';

const MainPageContainer = styled.div`
	display: block;
	padding: 0px !important;

	@media (min-width: 1200px) {
		display: flex;
	}
`;

const LeftPane = styled.div`
	padding: 0px !important;
	@media (min-width: 1200px) {
		margin: 25px;
		width: 900px;
	}
`;

const RightPane = styled.div`
	padding: 0px;
	@media (min-width: 1200px) {
		margin: 25px;
	}
`;

const key = 'global';
//TO-DO: Rounded corners on navigation bar, spaces on buttons, more whitespace, needs instructions

const MainPage = ({ ranges, rangeColors, mode, mode: { street, streetAction, isIP, suitSelection }, token }) => {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });
	const dispatch = useDispatch();
	const [ openChooseSuitModal, updateOpenChooseSuitModal ] = useState(false);

	useEffect(() => {
		updateOpenChooseSuitModal(false);
	}, []);

	const onHandleStreetHandler = (e, { name, value }) => {
		dispatch(
			initSetHandRange({
				name,
				value
			})
		);
	};

	const onHandleStreetHandlerButtons = (e, { street, streetAction }) => {
		dispatch(initSetHandRangeSelect({ name: street, value: streetAction }));
	};

	const onMouseOverHandler = (data) => {
		if (data.onMouseDownEvent) {
			let newHandRange = [];
			//if a suited hand was selected, and the suitSelection is offsuit, just return
			if (
				suitSelection.filter(
					(suit) =>
						suit && data.cards.substring(2, 3) === 's' && suit.substring(0, 1) !== suit.substring(1, 2)
				).length > 0
			)
				return;
			//if a offsuit hand was selected, and the suitSelection is suited, just return
			if (
				suitSelection.filter(
					(suit) =>
						suit &&
						(data.cards.substring(2, 3) === 'o' || data.cards.length === 2) &&
						suitSelection[0].substring(0, 1) === suitSelection[0].substring(1, 2)
				).length > 0
			)
				return;
			if (suitSelection.length > 0) {
				suitSelection.forEach((suit) => {
					if (suit)
						newHandRange = [
							...newHandRange,
							data.cards.substring(0, 1) +
								suit.substring(0, 1) +
								data.cards.substring(1, 2) +
								suit.substring(1, 2)
						];
				});
				dispatch(initSetHandRange(mapNewHandRange(ranges, street, streetAction, newHandRange)));
			} else {
				newHandRange = mapNewHandRange(ranges, street, streetAction, [ data.cards ]);
				dispatch(initSetHandRange(newHandRange));
			}
		}
		return data.cards;
	};

	const onManuallyChooseSuitsHandler = () => {
		updateOpenChooseSuitModal(true);
	};

	//TO-DO: need to align these left-to-right on big screens, top-to-bottom mobile
	return (
		<div>
			<SuitSelector open={openChooseSuitModal} onCloseHandler={() => updateOpenChooseSuitModal(false)} />
			<MainPageContainer>
				<LeftPane>
					<ProgressIndicator />
					<Board onMouseOverHandler={onMouseOverHandler} rangeColors={rangeColors} />
					<CurrentRanges />
				</LeftPane>
				<RightPane>
					<InputForm onManuallyChooseSuitsHandler={onManuallyChooseSuitsHandler} />
					<BoardLegend
						onHandleStreetHandler={onHandleStreetHandler}
						onHandleStreetHandlerButtons={onHandleStreetHandlerButtons}
						mode={mode}
					/>
				</RightPane>
			</MainPageContainer>
		</div>
	);
};
MainPage.propTypes = {
	ranges: PropTypes.object,
	mode: PropTypes.object,
	rangeColors: PropTypes.object
};

const mapStateToProps = () => {
	const getMapRange = makeSelectRange();
	const getSelectRange = makeSelectSelectedStreet();
	const getMode = makeSelectMode();
	const getDeadcards = makeSelectDeadcards();
	const getRangeRepoIP = makeSelectRangeRepoIP();
	const getRangeRepoOOP = makeSelectRangeRepoOOP();

	const mapState = (state) => {
		return {
			ranges: getMapRange(state),
			wholeRange: getSelectRange(state), //TODO: change to streetname
			mode: getMode(state),
			board: getDeadcards(state),
			rangeRepoIP: getRangeRepoIP(state),
			rangeRepoOOP: getRangeRepoOOP(state)
		};
	};
	return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(MainPage);
