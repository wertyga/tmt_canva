import React from 'react';
import { DEFAULT_SECTIONS, SidePanel, SectionTab } from 'polotno/side-panel';
import FaFileExport from '@meronex/icons/fa/FaFileExport';
import { TemplatesPanel } from '../TemplatesPanel/TemplatesPanel';
import { MyImages } from '../MyImages/MyImages';
import { PolotnoSizes } from '../PolotnoSizes/PolonoSizes';

const myImagesTab = {
  name: 'myImages',
  Tab: (props) => (
    <SectionTab name="My images" {...props}>
      <FaFileExport />
    </SectionTab>
  ),
  Panel: MyImages ,
};

export const PolotnoSidePanel = ({ store, sizes, setChosenTemplate, getChosenTemplate }: any) => {
  const updatedSidePanelSections = DEFAULT_SECTIONS.map(item => {
    switch (item.name) {
      case 'size':
        return {
          ...item,
          Panel: ({ store }: any) => (
            <PolotnoSizes store={store} sizes={sizes} />
          ),
        };
      case 'templates':
        return {
          ...item,
          Panel: ({ store }: any) => (
            <TemplatesPanel
              store={store}
              setChosenTemplate={setChosenTemplate}
              getChosenTemplate={getChosenTemplate}
            />
          ),
        };
      case 'myImages':
        return {
          ...item,
          Panel: ({ store }: any) => (
            <MyImages
              store={store}
            />
          ),
        };
      default:
        return item;
    }
  });
  return <SidePanel
    store={store}
    sections={[...updatedSidePanelSections.slice(0, 1), myImagesTab as any, ...updatedSidePanelSections.slice(1)]}
  />;
};
