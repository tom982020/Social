/** @format */

import { Container } from '@mui/material';
import { useEffect, useRef  } from  'react';
import Image from 'next/image';
import { Upload, message, Button as BTN, UploadFile } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { Transformation } from '@cloudinary/url-gen';
import { scale, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { compass, focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { sepia } from '@cloudinary/url-gen/actions/effect';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import { brightness, opacity } from '@cloudinary/url-gen/actions/adjust';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { byAngle } from '@cloudinary/url-gen/actions/rotate';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import React from 'react';


const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

type ChildProps = {
	handleClickSave: (e: React.MouseEvent, newValue: number) => void;
};

const UploadAvatarComponent: React.FC<ChildProps> =  (props) => {
	const [fileList, setFileList] = React.useState<UploadFile[]>([]);
	const [srcurl, setSrcurl] = React.useState<any>();
	const [uploading, setUploading] = React.useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const key = 'updatable';

	// const cld = new Cloudinary({
	// 	cloud: {
	// 		cloudName: 'social-tourism',
	// 		apiKey: '436894782398129',
	// 		apiSecret: 's_eR4SSwCwJnvcrfvgO7WcZaMj4',
	// 	},
	// });

	// const myImage = cld.image(srcurl);

	// myImage
	// 	.resize(thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face()))) // Crop the image.
	// 	.roundCorners(byRadius(20)) // Round the corners.
	// 	.effect(sepia()) // Apply a sepia effect.
	// 	.overlay(
	// 		// Overlay the Cloudinary logo.
	// 		source(
	// 			image(srcurl).transformation(
	// 				new Transformation()
	// 					.resize(scale(50)) // Resize the logo.
	// 					.adjust(opacity(60)) // Adjust the opacity of the logo.
	// 					.adjust(brightness(200))
	// 			) // Adjust the brightness of the logo.
	// 		).position(
	// 			new Position().gravity(compass('south_east')).offsetX(5).offsetY(5)
	// 		) // Position the logo.
	// 	)
	// 	.rotate(byAngle(10)) // Rotate the result.
	// 	.format('png');
		// cloudinary.v2.config({ 
		// 	cloud_name: 'social-tourism', 
		// 	api_key: '436894782398129', 
		// 	api_secret: 's_eR4SSwCwJnvcrfvgO7WcZaMj4',
		// 	secure: true
		//   });
	

	// cloudinaryRef.current = window.cloudinary
	
	const handleUpload = async () => {
		const formData = new FormData();
		// let files: any = null;
		// files.preview = await getBase64(fileList.originFileObj as RcFile);

		fileList.forEach(async (file: UploadFile) => {
			formData.append('files[]', file as RcFile);
		});
		setUploading(true);
		messageApi.open({
			key,
			type: 'loading',
			content: 'Uploading...',
		});
		// You can use any AJAX library you like
		fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
			method: 'POST',
			body: formData,
		})
			.then((res) => {
				res.json();
			})
			.then(() => {
				setFileList([]);

				// message.success('upload successfully.');
			})
			.then(() => {
				messageApi.open({
					key,
					type: 'success',
					content: 'upload successfully!',
					duration: 2,
				});
			})
			.catch(() => {
				message.error('upload failed.');
			})
			.finally(() => {
				setUploading(false);
			});
		
			// const result = await cloudinary.v2.uploader.upload(srcurl)
			// console.log(result);
	};

	const prop: UploadProps = {
		onRemove: async (file: UploadFile) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: async (file: UploadFile) => {
			setFileList([...fileList, file]);
			file.preview = await getBase64(file as RcFile);
			setSrcurl(file.preview);
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			console.log(fileList);
			newFileList.splice(index, 1);
			setFileList(newFileList);
			return false;
		},
		fileList,
	};

	return (
		<div>
			<Container>
				<Image
					// className={styles.logo}
					src={srcurl}
					alt="Avatar"
					width={590}
					height={300}
					priority
				/>
			</Container>

			<Container>
				{contextHolder}
				<Upload {...prop}>
					<BTN icon={<UploadOutlined />}>Select File</BTN>
				</Upload>
				<BTN
					type="primary"
					onClick={handleUpload}
					disabled={srcurl === ''}
					loading={uploading}
					style={{ marginTop: 16 }}>
					{uploading ? 'Uploading' : 'Start Upload'}
				</BTN>
				{/* <AdvancedImage cldImg={myImage} /> */}
			</Container>
		</div>
	);
};

export default UploadAvatarComponent;
