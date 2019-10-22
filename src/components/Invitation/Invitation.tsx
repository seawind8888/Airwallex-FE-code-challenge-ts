import React from 'react';
import './Invitation.scss'
import { submitInvitation } from '../../api'
import { Modal, Form, Input, Button } from 'antd/es';
import { FormProps } from 'antd/lib/form';
const FormItem = Form.Item;

interface InvitationState {
  isLoading: boolean,
  isSuccessed: boolean
  errorInfo: string;
}

interface InvitationProps extends FormProps {
  visible?: boolean;
  onCancel: () => void;
  ref?: any;
}

class InvitationModal extends React.PureComponent<InvitationProps, InvitationState> {
  state: InvitationState = {
    isLoading: false,
    isSuccessed: false,
    errorInfo: ''
  }
  handleCancel = () => {
    const { onCancel } = this.props
    onCancel()
  }
  handleSubmit = (e: React.FormEvent) => {
    const { form } = this.props
    e.preventDefault();
    this.setState({
      errorInfo: ''
    })
    form!.validateFields((err, values) => {
      if (!err) {
        this.setState({ isLoading: true }, async () => {
          try {
            const response: any = await submitInvitation({
              name: values.fullName,
              email: values.email
            })
            const data = await response.json() as any
            if (response.status === 200) {
              this.setState({ isSuccessed: true })
            } else {
              this.setState({ errorInfo: data.errorMessage })
            }
          } catch (error) {
            throw error;
          }
          this.setState({ isLoading: false,})
        })
      }
    });
  }
  handleOnClose = () => {
    this.setState({ 
      isSuccessed: false,
      errorInfo: ''
    })
  }

  checkConfirm = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && value !== form!.getFieldValue('email')) {
      callback('Two email that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkFullName = (rule: any, value: any, callback: any) => {
    if (value && value.length < 3) {
      callback('Full name needs to be at least 3 characters long!');
    } else {
      callback()
    }
  }
  render() {
    const { visible, onCancel, form } = this.props
    const { isSuccessed, isLoading, errorInfo } = this.state
    const { getFieldDecorator } = form!;
    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        afterClose={this.handleOnClose}
        footer={[isSuccessed ? <Button
          style={{ width: '100%' }}
          type="primary"
          size="large"
          key="ok"
          onClick={this.handleCancel}
        >OK
        </Button> :
          <Button
            key="submit"
            loading={isLoading}
            style={{ width: '100%' }}
            type="primary"
            size="large"
            onClick={this.handleSubmit}
          >
            {isLoading ? 'Sending, please wait...' : 'Send'}
          </Button>]}>
        <div className="modal-title">
          {isSuccessed ? 'All done!' : 'Request on invite'}
        </div>
        {
          !isSuccessed ?
            <Form>
              <FormItem >
                {getFieldDecorator('fullName', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your full-name!',
                    },
                    {
                      validator: this.checkFullName,
                    },
                  ],
                })(<Input placeholder="Full Name" />)}
              </FormItem>
              <FormItem >
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<Input placeholder="Email" />)}
              </FormItem>
              <FormItem >
                {getFieldDecorator('ConfirmEmail', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      validator: this.checkConfirm,
                    },
                  ],
                })(<Input placeholder="Confirm Email" />)}
              </FormItem>
            </Form>
            :
            <div className="succesed-info-container">
              <div>You will be one of the first to experience</div>
              <div>Broccoli & Co. when we launch.</div>
            </div>
        }
        {errorInfo ?
          <div className="submit-error-info">{errorInfo}</div> : null}

      </Modal>
    );
  }
}


const Invitation: any = Form.create()(InvitationModal);
export default Invitation;