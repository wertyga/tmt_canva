import React, { useState } from 'react';
import classnames from 'classnames';
import shortId from 'shortid';
import { Button, Input, Form } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';

import s from './styles.module.css';

type Props = {
  onSave: (t: any) => void;
};
type FormType = {
  name: string;
  width: string;
  height: string;
};

export const PolotnoSizesInputs: React.FC<Props> = ({ onSave }) => {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    direction: true,
  });
  
  const onChangeDirection = () => {
    setState(prev => ({ ...prev, direction: !prev.direction }));
  };
  
  const WidthInput = (
    <Form.Item
      className={s.input}
      label="Width:"
      name="width"
      rules={[{ required: true }]}
    >
      <Input name="width" type="number" style={{ height: 40 }} />
    </Form.Item>
  );
  const HeightInput = (
    <Form.Item
      className={s.input}
      label="Height:"
      name="height"
      rules={[{ required: true }]}
    >
      <Input name="height" type="number" style={{ height: 40 }} />
    </Form.Item>
  );
  
  const onSubmit = (payload: FormType) => {
    onSave({ ...payload, id: shortId.generate() });
    form.resetFields();
  };
  
  return (
    <Form
      form={form}
      className={classnames({
        [s.inputContainer]: true,
      })}
      layout="vertical"
      onFinish={onSubmit}
      name="sizes"
      size="small"
    >
      <Form.Item
        label="Name:"
        rules={[{ required: true }]}
        name="name"
        style={{
          marginBottom: '0.5rem',
        }}
      >
        <Input name="name" style={{ height: 40 }} />
      </Form.Item>
      <div className={s.inputs}>
        {state.direction ? WidthInput : HeightInput}
        <ArrowsAltOutlined
          className={s.reverseIcon}
          onClick={onChangeDirection}
        />
        {!state.direction ? WidthInput : HeightInput}
        <Button
          type="primary"
          size="small"
          htmlType="submit"
          className={s.saveSizeBtn}
        >
          Save
        </Button>
      </div>
    </Form>
  );
};
