const template = `{
	id: string;
	dataPreview: string;
	pageId: string;
	json: JSON;
}`;

export const getInfo = () => {
	const info = `{
handleCanvaTemplateSave: (template: ${template}, templateId?: string) => Promise<${template}[]>,
getCanvaStoreState: () => Promise<${template}[]>,
deleteCanvaTemplate: () => Promise<void>,
getUserCanvaImages: () => Promise<{ images: { url: string }[] }>,
	}`;
	
	console.log(info);
};
