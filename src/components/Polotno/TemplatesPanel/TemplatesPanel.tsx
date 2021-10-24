import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreType } from "polotno/model/store";
import { ImagesGrid } from 'polotno/side-panel/images-grid';

import s from './styles.module.css';

type Props = {
  store: StoreType;
  setChosenTemplate: (template: string) => void;
  getChosenTemplate: () => string;
};

export const TemplatesPanel = observer(({ store, setChosenTemplate, getChosenTemplate }: Props) => {
  const [state, setState] = useState({
    loading: true,
    templates: [] as any[],
  });
  
  const handleSelectTemplate = (image: any) => {
    setChosenTemplate(image.id);
    store.loadJSON(image.json);
  };
  
  const getTemplates = async () => {
    try {
      if (!(window as any).getCanvaStoreState) {
        throw new Error('THERE IS NO SUCH "getCanvaStoreState" event');
      }
      const templates = await (window as any).getCanvaStoreState();
      
      setState(prev => ({ ...prev, templates, loading: false }));
    } catch (e) {
      console.error(e);
      setState(prev => ({ ...prev, loading: false }));
    }
  };
  
  const onUpdateTemplates = (data) => {
    setState(prev => ({ ...prev, templates: data.detail || [] }));
  };
  
  const applyDeleteIcon = () => {
    document.querySelectorAll(`.${s.previewImage}`).forEach(image => {
      const parent = image.parentElement;
      if (!parent || parent.classList.contains(s.imageWrapper)) return;
      
      const id = (state.templates
        .find(template => template.dataPreview === image.getAttribute('src')) || {})
        .id;
      if (!id) return;
    });
  };
  
  const onDeleteTemplate = (data) => {
    setState(prev => ({ ...prev, templates: prev.templates.filter(({ id }) => id !== data.detail) }));
  };
  
  useEffect(() => {
    window.addEventListener('templates:update', onUpdateTemplates);
    window.addEventListener('template:delete', onDeleteTemplate);
    getTemplates();
    
    return () => {
      window.removeEventListener('templates:update', onUpdateTemplates);
      window.removeEventListener('template:delete', onDeleteTemplate);
    };
  }, []);
  
  useEffect(() => {
    applyDeleteIcon();
  }, [state.templates.length]);
  
  return (
    <div style={{ height: '100%' }}>
      <ImagesGrid
        shadowEnabled={false}
        images={state.templates}
        getImageClassName={() => {
          return s.previewImage;
        }}
        getPreview={image => image.dataPreview}
        onSelect={handleSelectTemplate}
        isLoading={state.loading}
        rowsNumber={1}
      />
    </div>
  );
});
