import React, { createContext, useContext, useRef } from 'react';
import s from './styles.module.css';

type Props = {
	show: (message: string) => void;
};

const NotificationContext = createContext<Props>({
	show: () => {},
});

export const useNotify = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
	const messageRef = useRef<any>(null);
	const timerRef = useRef<any>(null);
	
	const handleShow = (message: string, timeout: number = 5000) => {
		if (!messageRef.current) return;
		
		clearTimeout(timerRef.current);
		timerRef.current = null;
		messageRef.current.innerText = message;
		messageRef.current.classList.add(s.active);
		timerRef.current = setTimeout(() => {
			messageRef.current.classList.remove(s.active);
		}, timeout);
	};
	
	return (
		<NotificationContext.Provider value={{
			show: handleShow,
		}}>
			<div ref={messageRef} className={s.notification}/>
			{children}
		</NotificationContext.Provider>
	);
};
