import _ from 'lodash';
import { FETCH_CLIENTS, FETCH_CLIENT} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_CLIENTS:
            return _.mapKeys(action.payload.data, 'id');
        
        // case FETCH_NEW:
        //     let cur = _.mapKeys(action.payload.data, 'id');
        //     return Object.assign(cur, state);

        case FETCH_CLIENT:
            // const post = action.payload.data;
            // const newState = { ...state }; // take the all posts that we have and return it
            // newState[post.id] = post;
            // return newState;
            return { ...state, [action.payload.data.id]: action.payload.data }

        default:
            return state;

    }
}