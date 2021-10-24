import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import { StoreType } from "polotno/model/store";
import { ImagesGrid } from 'polotno/side-panel/images-grid';

type Props = {
	store: StoreType;
};

export const MyImages = observer(({ store }: Props) => {
	const [state, setState] = useState({
		loading: false,
		images: [] as any[],
	});
	
	const handleSelectImage = (image, pos, element) => {
		const imageTag = document.createElement('img');
		imageTag.src = image.url;
		console.log(imageTag.offsetWidth, imageTag.offsetHeight);
		console.log(store.activePage);
		
		const width = store.width / 2;
		const height = store.height / 2;
		const x = (pos?.x || store.width / 2) - width / 2;
		const y = (pos?.y || store.height / 2) - height / 2;
		store.activePage?.addElement({
			type: 'image',
			src: image.url,
			width,
			height,
			x,
			y,
		});
	};
	
	const handleLoadUseImages = async () => {
		try {
			if (!(window as any).getUserCanvaImages) {
				throw new Error('There is no "getUserCanvaImages" handler');
			}
			
			setState(prev => ({ ...prev, loading: true }));
			const { images = [] } = await (window as any).getUserCanvaImages();
			
			setState(prev => ({ ...prev, images, loading: false }));
		} catch (e) {
		  console.error(e.message);
		  message.error(e.message);
			setState(prev => ({ ...prev, loading: false }));
		}
	};
	
	useEffect(() => {
		handleLoadUseImages();
	}, []);
	
	return (
		<div style={{ height: '100%' }}>
			<ImagesGrid
				shadowEnabled={false}
				images={state.images}
				getPreview={image => image.url}
				onSelect={handleSelectImage}
				isLoading={state.loading}
				rowsNumber={1}
			/>
		</div>
	);
});
