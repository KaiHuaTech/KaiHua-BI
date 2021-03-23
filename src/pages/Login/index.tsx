import React from 'react';
import { useHistory } from 'ice';
import { Button, Form, Input } from '@alifd/next';

import userService from './services/user';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    fixedSpan: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function LoginAPP() {
  const history = useHistory();
  const handleSubmit = async (value, errors) => {
    if (!errors) {
      try {
        const result = await userService.login(value);
        history.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Form {...formItemLayout}>
        <FormItem
          label="Username:"
          required
          requiredMessage="Please input your username!"
          pattern={/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/}
          patternMessage="请输入正确的邮件地址"
        >
          <Input
            name="username"
          />
        </FormItem>
        <FormItem
          label="password:"
          required
          requiredMessage="Please input your password!"
          validateState="success"
          // todo: 自定义校验
        >
          <Input.Password name="password" placeholder="Please Enter Password" />
        </FormItem>
        <FormItem label=" " colon={false}>
          <Form.Submit type="primary" validate onClick={handleSubmit} style={{ marginRight: 8 }}>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </FormItem>
      </Form>
    </>
  );
}
