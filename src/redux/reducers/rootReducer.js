import { combineReducers } from "redux";
import appReducer from "./appReducer";
import musicReducer from "./musicReducer";

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const comomPersistConfig = {
	storage,
	stateReconciler: autoMergeLevel2
}

const appPersistConfig = {
	...comomPersistConfig,
	key: 'app',
	whitelist: ['banner']
}

const rootReducer = combineReducers({
	app: persistReducer(appPersistConfig, appReducer),
	music: persistReducer(appPersistConfig, musicReducer),
})

export default rootReducer