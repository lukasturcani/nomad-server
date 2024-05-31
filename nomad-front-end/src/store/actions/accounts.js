import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'
import errorHandler from './errorHandler'

export const fetchCostsStart = () => ({
  type: actionTypes.FETCH_COSTS_START
})

export const fetchCostsSuccess = payload => ({
  type: actionTypes.FETCH_COSTS_SUCCESS,
  payload
})

export const setTableHeader = payload => ({
  type: actionTypes.SET_TABLE_HEADER,
  payload
})

export const fetchCosts = (token, searchParams) => {
  const payload = searchParams.groupId ? 'User Name' : 'Group Name'
  return dispatch => {
    dispatch(setTableHeader(payload))
    dispatch(fetchCostsStart())
    axios
      .get('admin/accounts/data/?' + new URLSearchParams(searchParams).toString(), {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(res => {
        dispatch(fetchCostsSuccess(res.data))
      })
      .catch(err => {
        dispatch(errorHandler(err))
      })
  }
}

export const resetCostsTable = () => ({
  type: actionTypes.RESET_COSTS_TABLE
})

export const toggleCostingDrawer = () => ({
  type: actionTypes.TOGGLE_COSTING_DRAWER
})

export const fetchInstrumentsCostingSuccess = payload => ({
  type: actionTypes.FETCH_INSTRUMENTS_COSTING_SUCCESS,
  payload
})

export const fetchInstrumentsCosting = token => {
  return dispatch => {
    axios
      .get('admin/accounts/instruments-costing/', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(res => {
        dispatch(fetchInstrumentsCostingSuccess(res.data))
      })
      .catch(err => {
        dispatch(errorHandler(err))
      })
  }
}
export const updateInstrumentsCostingSuccess = () => ({
  type: actionTypes.UPDATE_INSTRUMENTS_COSTING_SUCCESS
})

export const updateInstrumentsCosting = (token, data) => {
  return dispatch => {
    axios
      .put('admin/accounts/instruments-costing/', data, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(res => {
        dispatch(updateInstrumentsCostingSuccess())
      })
      .catch(err => {
        dispatch(errorHandler(err))
      })
  }
}

export const setAccountsType = payload => ({
  type: actionTypes.SET_ACCOUNTS_TYPE,
  payload
})

export const toggleGrantForm = () => ({
  type: actionTypes.TOGGLE_GRANT_FORM
})

export const postGrantSuccess = payload => ({
  type: actionTypes.POST_GRANT_SUCCESS,
  payload
})

export const postGrant = (token, data) => {
  return dispatch => {
    axios
      .post('admin/accounts/grants/', data, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(res => {
        dispatch(postGrantSuccess(res.data))
      })
      .catch(err => {
        dispatch(errorHandler(err))
      })
  }
}

export const getGrantsSuccess = payload => ({
  type: actionTypes.GET_GRANTS_SUCCESS,
  payload
})

export const fetchGrants = token => {
  return dispatch => {
    axios
      .get('admin/accounts/grants/', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(res => {
        dispatch(getGrantsSuccess(res.data))
      })
      .catch(err => {
        dispatch(errorHandler(err))
      })
  }
}
