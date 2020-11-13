import reducer, { initialState } from '../../src/containers/MainPage/reducer';
import * as types from '../../src/containers/MainPage/constants';
import { initGetScenario, initGetAllScenario } from '../../src/containers/MainPage/actions';


import nock from 'nock';
import httpResponseGetScenario from './httpResponseGetScenario.json';
import httpResponseGetAllScenario from './httpResponseGetAllScenario.json';
import Scenario from "../../src/containers/MainPage/ScenarioLoader/Scenario";
import SagaTester from 'redux-saga-tester';
import saga from '../../src/containers/MainPage/saga'
describe("Integration tests: ", () => {
    test('The reducer when action GET_SCENARIO_SUCCESS should return the new state for the reducer', async () => {
		nock('http://localhost:3000')
		.post('/api/private/get-scenario')
		.reply(200, {
			...httpResponseGetScenario
			})
		
		let sagaTester = null

		sagaTester = new SagaTester({initialState, reducers: reducer});

		sagaTester.start(saga);

		const scenario = new Scenario({ 
			board: 'AcTh4s', rangeRepoIP: initialState.rangeRepoIP, 
			rangeRepoOOP: initialState.rangeRepoOOP, user: 'Evan', 
			ScenarioName: 'Test Scenario', OpenerPosition: 'CO', 
			DefenderPosition: 'BU' })

		sagaTester.dispatch(initGetScenario({ scenario } ));

		await sagaTester.waitFor(types.GET_SCENARIO_SUCCESS);
		
		const finalReducerValue = sagaTester.getState();

		// await sagaTester.waitFor(getScenarioSuccess());
		expect(finalReducerValue.rangeRepoIP[0].hands).toEqual(['A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s']);
    });

    test('The reducer when action GET_ALL_SCENARIO_SUCCESS should return the new state for the reducer', async () => {
		nock('http://localhost:3000')
		.post('/api/private/get-all-scenario')
		.reply(200, {
            ...httpResponseGetAllScenario
			})
		
		let sagaTester = null

		sagaTester = new SagaTester({initialState, reducers: reducer});

		sagaTester.start(saga);

		const scenario = new Scenario({ 
			board: 'AcTh4s', rangeRepoIP: initialState.rangeRepoIP, 
			rangeRepoOOP: initialState.rangeRepoOOP, user: 'Evan', 
			ScenarioName: 'Test Scenario', OpenerPosition: 'CO', 
			DefenderPosition: 'BU' })

		sagaTester.dispatch(initGetAllScenario({ scenario } ));

		await sagaTester.waitFor(types.GET_ALL_SCENARIO_SUCCESS); 
		
		const finalReducerValue = sagaTester.getState();

        expect(finalReducerValue.scenarioBoards).toStrictEqual(
            {"0": ["AcAsAh", "fdsaasdfasdfasdfasdf", "BU", "MP"], 
            "1": ["Jh4h2s", "875fancyflop", "BU", "MP"], 
            "2": ["AcTs", "asdf1234", "SB", "MP"], 
            "3": ["Ac", "asfdsdfasdfasdf", "SB", "UTG"]
        });
    });

});