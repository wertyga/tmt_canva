import React, { useState } from 'react';
import classnames from 'classnames';
import { Button, Divider } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { PolotnoSizesInputs } from './PolotnoSizesInputs';
import { DEFAULT_SIZES } from './helpers';

import s from './styles.module.css';

type Props = {
  store: any;
  sizes: any[];
};

export const PolotnoSizes: React.FC<Props> = observer(
  ({ store, sizes = [] }) => {
    const [state, setState] = useState([
      ...DEFAULT_SIZES,
      ...sizes,
    ]);

    const handleDelete = (id: string) => (e: any) => {
      e.stopPropagation();
      setState(state.filter(item => item.id !== id));
    };
    
    const onSave = (sizeTemplate: any) => {
      setState([sizeTemplate, ...state]);
    };

    return (
      <div>
        <PolotnoSizesInputs onSave={onSave} />
        <div className={s.templates}>
          {state.map(({ width, height, name, id }) => {
            const isActive = store.width === width && store.height === height;
            return (
              <div key={name}>
                <div
                  className={classnames({
                    [s.sizeContainer]: true,
                    [s.active]: isActive,
                  })}
                  role="presentation"
                  onClick={() => {
                    store.setSize(width, height);
                  }}
                >
                  <span className={s.sizeName}>{name}</span>
                  <span className={s.size}>
                    {width}x{height}
                  </span>
                  {!!id && (
                    <Button
                      danger
                      icon={<CloseSquareFilled />}
                      onClick={handleDelete(id)}
                    />
                  )}
                </div>
                <Divider style={{ margin: 0 }} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
