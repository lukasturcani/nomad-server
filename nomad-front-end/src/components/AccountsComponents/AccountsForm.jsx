import React, { useEffect } from 'react'
import { Form, DatePicker, Button, Select, Tooltip, Radio, Modal, Space } from 'antd'
import { CloseOutlined, QuestionOutlined } from '@ant-design/icons'

const { Option } = Select
const { RangePicker } = DatePicker

const AccountsForm = props => {
  const [form] = Form.useForm()
  const { type, token } = props

  useEffect(() => form.resetFields(), [type])

  const grpOptions = props.groupList.map(grp => (
    <Option value={grp.id} key={grp.id}>
      {grp.name}
    </Option>
  ))

  const radioOptions = ['Grants', 'Groups', 'Users']

  const submitHandler = values => {
    const { dateRange } = values

    if (type === 'Users' && values && !values.groupId) {
      return Modal.error({
        title: 'No group defined',
        content: 'Please select the group for which you want to perform the calculation.'
      })
    }

    if (dateRange) {
      values.dateRange = dateRange.map(date => date.format('YYYY-MM-DD'))
    }

    if (type !== 'Grants') {
      props.getCosts(token, values)
    } else {
      props.getGrantsCosts(token, { dateRange: values.dateRange })
    }
  }

  const infoModalConfig = {
    title: 'Accounting Calculations',
    width: 800,
    content: (
      <div>
        <strong>Grants</strong>
        <strong>Groups</strong>
        <strong>Users</strong>
      </div>
    )
  }

  return (
    <Form form={form} layout='inline' onFinish={values => submitHandler(values)}>
      <Space size='large' style={{ marginRight: '30px' }}>
        <Button
          shape='circle'
          icon={<QuestionOutlined />}
          size='small'
          onClick={() => Modal.info(infoModalConfig)}
        />
        <Radio.Group
          options={radioOptions}
          optionType='button'
          buttonStyle='solid'
          value={type}
          onChange={({ target: { value } }) => props.typeHandler(value)}
        />
      </Space>
      <Form.Item label='Group' name='groupId'>
        <Select style={{ width: 150 }} disabled={type !== 'Users'}>
          {grpOptions}
        </Select>
      </Form.Item>
      <Form.Item label='Date Range' name='dateRange'>
        <RangePicker allowClear={true} />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={props.loading}>
          Calculate Costs
        </Button>
      </Form.Item>
      <Form.Item>
        <Tooltip title='Reset Form'>
          <Button
            danger
            shape='circle'
            icon={<CloseOutlined />}
            onClick={() => {
              form.resetFields()
              props.resetHandler()
            }}
          />
        </Tooltip>
      </Form.Item>
    </Form>
  )
}

export default AccountsForm
