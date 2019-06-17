import createSagaMiddleware, {SagaMiddleware} from "redux-saga";
import {applyMiddleware, compose, createStore} from "redux";
import reducer from "services/reducer";
import saga from "services/saga";
import {fromJS} from "immutable";

let store: any;

const initialState: any = fromJS({});

const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

if (process.env && process.env.NODE_ENV !== "production") {
    const composeEnhancers: any = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));
} else {
    store = createStore(reducer, initialState, compose(applyMiddleware(sagaMiddleware)));
}

sagaMiddleware.run(saga);

export default store;
