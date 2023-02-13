import { all, call, takeLatest, put } from "redux-saga/effects";
import { USER_ACTION_TYPE } from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  signOutFailed,
  signOutSuccess,
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithCredentials,
  signInWithGooglePopUp,
  signOutUser,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPE.CHECK__USER_SESSION, isUserAuthenticated);
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopUp);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error.message));
  }
}

export function* onGoogleSignIn() {
  yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(signInWithCredentials, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* onSignInWithCredentials(email) {
  yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed());
  }
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp);
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* onSignOut() {
  yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignIn),
    call(onSignInWithCredentials),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOut),
  ]);
}
