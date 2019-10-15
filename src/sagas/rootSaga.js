import { all, fork } from "redux-saga/effects";
import { watchWeather } from "./weatherSaga";

export default function* rootSaga() {
  yield all([fork(watchWeather)]);
};
