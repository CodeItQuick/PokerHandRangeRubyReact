import React from "react";
import MainPage from "../../src/containers/MainPage/";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import reducer, { initialState } from "../../src/containers/Auth/reducer";
import * as types from "../../src/containers/Auth/constants";

const defaultReducerState = initialState;

describe('auth reducer', () => {
    test('should return the initial state', function() {
        expect(reducer(undefined, {})).toEqual(
            defaultReducerState
        )
    });
    //text.each(data)
    test('The reducer with action '  + types.USER_SIGNIN + ' should return the new mode', () =>  {
        const action = {type: types.USER_SIGNIN, action: {
            name: 'evant',
            password: 'evant'
              
        }};

        let newState = JSON.parse(JSON.stringify(defaultReducerState));
        newState = {...defaultReducerState,  
            loading: true,
            data: false,
            token: null,
            error: {invalid: false, message: null }
        };

        expect(reducer(initialState, action)).toEqual(newState);    
    }); 
    test('The reducer with action '  + types.USER_SIGNIN_SUCCESS + ' should return the new mode', () =>  {
        const action = {type: types.USER_SIGNIN_SUCCESS, 
            token: 'bunchasecretletters'
        };

        let newState = JSON.parse(JSON.stringify(defaultReducerState));
        newState = {...defaultReducerState,  
            loading: false,
            token: 'bunchasecretletters'
        };

        expect(reducer(undefined, action)).toEqual(newState);
       

    }); 

    test('The reducer with action '  + types.USER_SIGNIN_SUCCESS + ' should return the new mode', () =>  {

        const newState = {...defaultReducerState,  
            loading: false,
            token: 'bunchasecretletters'
        };

        const actionSignout = {
            type: types.USER_SIGNOUT_SUCCESS,
            action: { 
            }
        };

        const endState = {
            ...defaultReducerState, 
            data: false,
            token: null 
        }

        expect(reducer(newState, actionSignout)).toEqual(endState);
        
        });

        test('The reducer with action '  + types.INIT_REGISTER_USER + ' should return the new mode', () =>  {
            const action = {type: types.INIT_REGISTER_USER, 
                user: {
                    name: 'evant',
                    email: 'evant@evant.com',
                    password: 'evant',
                    password_confirmation: 'evant'
                }
            };
    
            let newState = JSON.parse(JSON.stringify(defaultReducerState));
            newState = {...defaultReducerState,  
                loading: true,
                params: {
                    name: 'evant',
                    email: 'evant@evant.com',
                    password: 'evant',
                    password_confirmation: 'evant'
                }
            };
    
            expect(reducer(undefined, action)).toEqual(newState);
           
    
        }); 

        test('The reducer with action '  + types.INIT_REGISTER_USER + ' should return the new mode', () =>  {
            const action = {type: types.INIT_REGISTER_USER, 
                user: {
                    name: 'evant',
                    email: 'evant@evant.com',
                    password: 'evant',
                    password_confirmation: 'evant'
                }
            };
    
            let newState = JSON.parse(JSON.stringify(defaultReducerState));
            newState = {...defaultReducerState,  
                loading: true,
                params: {
                    name: 'evant',
                    email: 'evant@evant.com',
                    password: 'evant',
                    password_confirmation: 'evant'
                }
            };
    
            expect(reducer(undefined, action)).toEqual(newState);
           
    
        }); 

        test('The reducer with action '  + types.INIT_REGISTER_USER + ' should return the new mode', () =>  {
            const action = {type: types.REGISTER_USER_SUCCESS, 
                user: {
                    name: 'evant',
                    email: 'evant@evant.com',
                    password: 'evant',
                    password_confirmation: 'evant'
                }
            };
    
            let initState = JSON.parse(JSON.stringify(defaultReducerState));
            initState = {...defaultReducerState,  
                loading: true,
                params: {
                    name: 'evant',
                    email: 'evant@evant.com',
                    password: 'evant',
                    password_confirmation: 'evant'
                }
            };

            const successState = JSON.parse(JSON.stringify(defaultReducerState));
            initState = {...defaultReducerState,  
                loading: false,
            }; 
    
            expect(reducer(initState, action)).toEqual(successState);
           
    
        }); 

});