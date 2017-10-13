/* eslint-disable no-param-reassign */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import home from './routes/Home/reducer';
import login from './routes/Login/reducer';
import selectRepos from './routes/SelectRepos/reducer';
import layout from './components/Layout/reducer';
import { rehydrationComplete } from './components/Layout/actions';

const appReducer = combineReducers({ home, login, selectRepos, layout });

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware),
    autoRehydrate({ log: true }),
  ),
);

const dispatchRehydrationComplete = () => {
  store.dispatch(rehydrationComplete());
};

persistStore(
  store,
  { whitelist: ['login', 'home', 'selectRepos'] },
  dispatchRehydrationComplete,
);

export default store;
