import React from 'react'
import { Form, Input, Icon, message, Tooltip } from 'antd'
const FormItem = Form.Item

export default class EditableInput extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text,
      edit: false
    }
  }

  changeText = (e) => {
    let value = e.target.value
    value.length > 0 ? this.setState({text: value}) :
      message.error('Field cannot be empty')
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({edit: false})
    this.props.edit(this.state.text)
  }

  render() {
    const { text } = this.props
    const { formData } = this.state
    return (
      <span>
        {
          this.state.edit ?
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formData}>
              <Input autoFocus onBlur={this.handleSubmit}
               value={this.state.text} onChange={this.changeText} />
            </FormItem>
          </Form> :
          <Tooltip placement="bottom" title="Edit folder name">
            <Icon type="edit" onClick={() => this.setState({edit: true})} className="cursor-pointer"/>
          </Tooltip>
        }
      </span>
    )
  }
}
