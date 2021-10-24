import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import { Button, Navbar, Alignment } from '@blueprintjs/core';
import {StoreType} from "polotno/model/store";

type Props = {
  store: StoreType;
  getChosenTemplate: () => string;
  setChosenTemplate: (template: string) => void;
};

export default observer(({
  store,
  getChosenTemplate,
  setChosenTemplate: setChosenTemplateProp,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [chosenTemplate, setChosenTemplate] = useState(getChosenTemplate());
  
  const onSaveTemplate = async () => {
    try {
      if (!(window as any).handleCanvaTemplateSave) {
        throw new Error('THERE IS NO SUCH "handleCanvaTemplateSave" event');
      }
      const isPageFulfilled =
        store.pages
          .map((page: any) => page.children.map((child: any) => child.id))
          .flat().length > 0;
      if (!isPageFulfilled) {
        message.error('Feel the page');
        return;
      }
      setLoading(true);
      const pageId = store.toJSON().pages[0].id;
      const daraUrlImage = store.toDataURL({ mimeType: 'image/png' });
      const template = {
        dataPreview: daraUrlImage,
        pageId,
        json: store.toJSON(),
      };

      const templates = await (window as any).handleCanvaTemplateSave(template, chosenTemplate);
      if (!chosenTemplate) {
        deletePage();
      }
  
      window.dispatchEvent(new CustomEvent('templates:update', { detail: templates }))
    } catch (e) {
      message.error(e.message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  const onDeleteTemplate = async () => {
    try {
      if (!(window as any).deleteCanvaTemplate) {
        throw new Error('There is no "deleteCanvaTemplate" handler');
      }
      if (!window.confirm('Delete template?')) {
        return;
      }
      setLoading(true)
      await (window as any).deleteCanvaTemplate(chosenTemplate);
      window.dispatchEvent(
        new CustomEvent(
          'template:delete',
          { detail: chosenTemplate },
        ),
      );
      deletePage();
    } catch (e) {
      console.error(e);
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  
  const deletePage = () => {
    const pagesIds = store.pages.map((p: any) => p.id);
    setChosenTemplateProp('');
    store.deletePages(pagesIds);
    store.addPage();
  };
  
  useEffect(() => {
    store.on('change', () => {
      setChosenTemplate(getChosenTemplate());
    })
  }, []);
  
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Button
          icon="new-object"
          minimal
          onClick={() => {
            const ids = store.pages
              .map((page: any) => page.children.map((child: any) => child.id))
              .flat();
            const hasObjects = ids?.length;
            if (hasObjects) {
              if (!window.confirm('Remove all content for a new design?')) {
                return;
              }
            }
            deletePage();
          }}
        >
          New
        </Button>
        <Button icon="floppy-disk" minimal onClick={onSaveTemplate} loading={loading}>
          Save
        </Button>
        {!!chosenTemplate &&
          <Button icon="trash" minimal loading={loading} onClick={onDeleteTemplate}  disabled={!chosenTemplate}>
            Delete template
          </Button>
        }
      </Navbar.Group>
    </Navbar>
  );
});
