import React, { useRef } from 'react';
import {
  PolotnoContainer,
  SidePanelWrap,
  WorkspaceWrap,
} from 'polotno/polotno-app';
import { createStore } from 'polotno/model/store';
import Toolbar from 'polotno/toolbar/toolbar';
import ZoomButtons from 'polotno/toolbar/zoom-buttons';
import Workspace from 'polotno/canvas/workspace';
import Topbar from './TopBar';
import { PolotnoSidePanel } from './PolotnoSidePanel/PolotnoSidePanel';
import { getInfo } from '../utils/info';

(window as any).canvaInfo = getInfo;

// (window as any).handleCanvaTemplateSave = function(data, templateId?: string) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       const templates = JSON.parse(localStorage.getItem('canva') || '[]');
//       const newTemplates = templateId ? templates.map(item => {
//         if (item.id === templateId) return { id: templateId, ...data };
//         return item;
//         }) : [...templates, { id: Math.random(), ...data}];
//       localStorage.setItem('canva', JSON.stringify(newTemplates));
//       resolve(newTemplates);
//     }, 1000);
//   });
// };
// (window as any).getCanvaStoreState = function() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(JSON.parse(localStorage.getItem('canva') || '[]'));
//     }, 1000);
//   });
// };
// (window as any).deleteCanvaTemplate = function(templateId: string) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       const templates = JSON.parse(localStorage.getItem('canva') || '[]').filter(({ id }) => id !== templateId);
//       localStorage.setItem('canva', JSON.stringify(templates));
//       resolve({});
//     }, 1000);
//   });
// };
// (window as any).getUserCanvaImages = function() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         images: [
//           {
//             url: 'https://images.unsplash.com/photo-1619878627081-85dd33d8667e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTY5OTZ8MHwxfHNlYXJjaHwyMHx8Y2FudmFzfGVufDB8fHx8MTYzNTA2OTI1MQ&ixlib=rb-1.2.1&q=80&w=400\n',
//           },
//           {
//             url: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
//           },
//           {
//             url: 'https://justsomething.co/wp-content/uploads/2013/10/9.jpg',
//           },
//         ],
//       });
//     }, 1000);
//   });
// };

const Polotno = () => {
  const wrapper = useRef<HTMLDivElement>(null);
  const chosenTemplateRef = useRef<any>(null);
  const store = useRef(createStore({ key: '3gylZuBSeYiTZ7Oxwghd', showCredit: false }));
  
  const setChosenTemplate = (template: any) => {
    chosenTemplateRef.current = template;
  };
  const getChosenTemplate = () => {
    return chosenTemplateRef.current;
  };
  
  return (
    <div
      ref={wrapper}
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <Topbar
        store={store.current}
        getChosenTemplate={getChosenTemplate}
        setChosenTemplate={setChosenTemplate}
      />
      <div style={{ height: 'calc(100% - 50px)' }}>
        <PolotnoContainer>
          <SidePanelWrap>
            <PolotnoSidePanel
              store={store.current}
              setChosenTemplate={setChosenTemplate}
              getChosenTemplate={getChosenTemplate}
            />
          </SidePanelWrap>
          <WorkspaceWrap>
            <Toolbar store={store.current} />
            <Workspace store={store.current} pageControlsEnabled={false} />
            <ZoomButtons store={store.current} />
          </WorkspaceWrap>
        </PolotnoContainer>
      </div>
    </div>
  );
};

export default Polotno;
