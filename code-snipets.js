module.exports = {
	actionTypes: {
		actionTypeGroup: `
export const @{ACTION_TYPE} = {
	REQUEST_START: '@{ACTION_TYPE}_REQUEST_START',
	REQUEST_SUCCESS: '@{ACTION_TYPE}_REQUEST_SUCCESS',
	REQUEST_FAIL: '@{ACTION_TYPE}_REQUEST_FAIL'
};
		`
	},
	actions: {
		import: `
import {
	@{METHOD}_@{MODEL},
	 POST_WARIS_MEMBERS,
	 PATCH_WARIS_MEMBERS,
	 PUT_WARIS_MEMBERS,
	 DELETE_WARIS_MEMBERS
} from './actionTypes';
`,
		method: `
export const @{INPUT_METHOD}@{MODEL}Actions = {
	@{METHOD}@{MODEL}RequestStart: () => ({
		type: @{METHOD_UPPER}_@{MODEL_UPPER}.REQUEST_START
	}),
	@{METHOD}@{MODEL}RequestSuccess: (payload) => ({
		type: @{METHOD_UPPER}_@{MODEL_UPPER}.REQUEST_SUCCESS,
		payload
	}),
	@{METHOD}@{MODEL}RequestFail: (payload) => ({
		type: @{METHOD_UPPER}_@{MODEL_UPPER}.REQUEST_FAIL,
		payload
	})
};
	`
	},
	methods: {
		startSnipet: `export const @{MODEL}Methods = {`,
		contents: `
	@{METHOD_UPPER}_@{MODEL_UPPER}: '@{METHOD_UPPER}_@{MODEL_UPPER}'`,
		endSnipet: `};`
	},
	reducer: {
		imports: {
			startSnipet: `
import {`,
			contents: `
	@{METHOD_PL}_@{MODEL_PL}`,
			endSnipet: `
} from './actionTypes';`
		},
		initialState: {
			startSnipet: `
const initialState = {`,
			endSnipet: `
};`,
			method: `
	@{METHOD}ActionState: {
		requesting: false,
		success: false,
		fail: false,
		errors: {}
	}`,
			data: `
	data: {
		totalCount: 0,
		list: []
	}`
		},
		modelReducer: {
			startSnipet: `
	export const @{MODEL}Reducer = (state = initialState, action) => {
		switch (action.type) {`,
			contents: `
		case @{METHOD_PL}_@{MODEL_PL}.REQUEST_START:
			return {
				...state,
				getActionState: {
					requesting: true,
					success: false,
					fail: false,
					errors: {}
				}
			};

		// Request succeds
		case @{METHOD_PL}_@{MODEL_PL}.REQUEST_SUCCESS:
			return {
				...state,
				getActionState: {
					requesting: false,
					success: true,
					fail: false,
					errors: {}
				}
			};

		// Request fails
		case @{METHOD_PL}_@{MODEL_PL}.REQUEST_FAIL:
			return {
				...state,
				getActionState: {
					requesting: false,
					success: false,
					fail: true,
					errors: {}
				}
			};`,

			endContents: `
		default:
			return state;`,
			endSnipet: `	
	}
};`
		}
	},
	dispatcher: {
		imports: {
			static: `
import { @{MODEL}Methods } from './methods';
import { @{MODEL}Apis } from '../../apis';
import { Dispatch } from 'redux';`,
			methodStart: `
import {`,
			methodContents: `
	@{METHOD}@{MODEL}Actions`,
			methodEnd: `
} from './actions';`
		},
		contents: {
			start: `
export default {`,
			body: `
	[@{MODEL}Methods.@{METHOD_UPER}_@{MODEL_UPPER}]: (payload) => async (dispatch) => {
		try {
			// Dispatch start action
			dispatch(@{METHOD}@{MODEL}Actions.@{METHOD}@{MODEL}RequestStart());

			// Call API
			const response = await @{MODEL}Apis.@{METHOD}@{MODEL}();

			if (response?.data?.success === true) {
				// Dispatch success action
				dispatch(@{METHOD}@{MODEL}Actions.@{METHOD}@{MODEL}RequestSuccess(response?.data?.data));
			}
		} catch (error) {
			// Dispatch fail action
			dispatch(@{METHOD}@{MODEL}Actions.@{METHOD}@{MODEL}RequestFail(error?.response?.data));
		}
	},`,

			end: `}`
		}
	},
	index: `
import dispatchers from './dispatchers';

export * from './methods';

export const initiate@{MODEL_CAP}Dispather = (method, payload) => {
	return dispatchers[method](payload);
};
	`
};


