import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Empty, Drawer } from 'antd'

import AccountsForm from '../../components/AccountsComponents/AccountsForm'
import AccountsTable from '../../components/AccountsComponents/AccountsTable'
import CostingTable from '../../components/AccountsComponents/CostingTable'

import {
  fetchCosts,
  fetchGroupList,
  fetchInstrumentsCosting,
  resetCostsTable,
  setAccountsType,
  toggleCostingDrawer,
  updateInstrumentsCosting
} from '../../store/actions'

import classes from './Accounts.module.css'

const Accounts = props => {
  const { fetchGrpList, authToken, grpList, tableData, resetTable, fetchCosting, accountsType } =
    props

  useEffect(() => {
    fetchGrpList(authToken, false)
    fetchCosting(authToken)
    return () => {
      resetTable()
    }
  }, [authToken, fetchGrpList, resetTable, fetchCosting])

  const onFormSubmit = values => {
    const { dateRange } = values
    if (dateRange) {
      values.dateRange = dateRange.map(date => date.format('YYYY-MM-DD'))
    }
    props.fetchCostsData(authToken, values)
  }

  const tableElement =
    accountsType === 'Grants' ? (
      <div>GRANTS TABLE</div>
    ) : (
      <AccountsTable data={tableData} header={props.tblHeader} />
    )

  return (
    <div>
      <div className={classes.Form}>
        <AccountsForm
          groupList={grpList}
          submitHandler={onFormSubmit}
          loading={props.loading}
          resetHandler={resetTable}
          typeHandler={props.setAccountsType}
          type={accountsType}
        />
      </div>
      {tableData.length > 0 ? tableElement : <Empty />}
      <Drawer
        title='Set Costing for Instruments'
        placement='top'
        closable={true}
        open={props.drwVisible}
        onClose={props.tglDrawer}
        height={300}
      >
        {props.instrumentsCosting.length > 0 && (
          <CostingTable
            resetTable={resetTable}
            fetchDataHandler={props.fetchCosting}
            updateDataHandler={props.updateCosting}
            token={props.authToken}
            costingData={props.instrumentsCosting}
          />
        )}
      </Drawer>
    </div>
  )
}

const mapStateToProps = state => ({
  authToken: state.auth.token,
  grpList: state.groups.groupList,
  loading: state.accounts.loading,
  tableData: state.accounts.costsTableData,
  drwVisible: state.accounts.drawerVisible,
  tblHeader: state.accounts.tableHeader,
  instrumentsCosting: state.accounts.costingData,
  accountsType: state.accounts.type
})

const mapDispatchToProps = dispatch => ({
  fetchGrpList: (token, showInactive) => dispatch(fetchGroupList(token, showInactive)),
  fetchCostsData: (token, searchParams) => dispatch(fetchCosts(token, searchParams)),
  fetchCosting: token => dispatch(fetchInstrumentsCosting(token)),
  updateCosting: (token, data) => dispatch(updateInstrumentsCosting(token, data)),
  resetTable: () => dispatch(resetCostsTable()),
  tglDrawer: () => dispatch(toggleCostingDrawer()),
  setAccountsType: type => dispatch(setAccountsType(type))
})

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)
