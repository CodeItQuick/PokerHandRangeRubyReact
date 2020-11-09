import { call, put, all, takeLatest, cancelled } from 'redux-saga/effects';
import qs from 'qs';

import { INIT_SAVE_SCENARIO, INIT_GET_SCENARIO, INIT_GET_ALL_SCENARIO } from './constants';
import {
	getScenarioSuccess,
	getScenarioFail,
	getAllScenarioSuccess,
	saveScenarioSuccess
} from './actions';
import request from '../../utils/request';
import { useAuth0 } from '@auth0/auth0-react';

let baseURL = 'http://localhost:3000';

/**
 * Get All Hand Ranges request/response handler
 */
export function* saveScenario({ data: { deadcards, rangeRepoIP, rangeRepoOOP, user, token } }) {
	const requestUrl = `http://localhost:3000/api/public/insert`;

	if (!token) return;

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	};
	const body = {
		deadcards,
		rangeRepoIP: rangeRepoIP,
		rangeRepoOOP: rangeRepoOOP,
		user: user
	};

	const requestParams = {
		body: JSON.stringify(body),
		headers,
		method: 'POST'
	};

	try {
		const { results } = yield call(request, requestUrl, requestParams);

		yield put(saveScenarioSuccess(results));
	} catch (err) {
		console.log(err);
	}
}

/**
 * Get All Hand Ranges request/response handler
 */
export function* getScenario({ data: { scenario, token } }) {
	const requestUrl = `http://localhost:3000/api/public/get-scenario`;

	if (!token) return;

	try {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		};
		const body = {
			boardcards: scenario.displayScenario()
		};

		const requestParams = {
			body: JSON.stringify(body),
			headers,
			method: 'POST'
		};

		//yield call/put/cancelled APICALL
		const response = yield call(request, requestUrl, requestParams);
		yield put(getScenarioSuccess(response));
		// yield put(allUserHandRangesSuccess(allRanges));
	} catch (err) {
		console.log(err);
		yield put(getScenarioFail(err));

		//yield errorHandling
		// yield put(allUserHandRangesFail(err));
	}
}

/**
 * Get All Hand Ranges request/response handler
 */
export function* getAllScenario({ data }) {
	const requestUrl = `http://localhost:3000/api/public/get-all-scenario`;

	if (!data) return;

	try {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${data}`
		};

		const requestParams = {
			headers,
			method: 'POST'
		};

		//yield call/put/cancelled APICALL
		const response = yield call(request, requestUrl, requestParams);
		yield put(getAllScenarioSuccess(response));
	} catch (err) {
		console.log(err);
		// yield put(getScenarioFail(err));

		//yield errorHandling
		// yield put(allUserHandRangesFail(err));
	}
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* handData() {
	yield all([
		takeLatest(INIT_SAVE_SCENARIO, saveScenario),
		takeLatest(INIT_GET_SCENARIO, getScenario),
		takeLatest(INIT_GET_ALL_SCENARIO, getAllScenario)
	]);
}
