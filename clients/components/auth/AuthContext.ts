/** @format */

'use strict';

import axios from 'axios';
import { createContext, useContext, useState } from 'react';

type Token = {
	access_token: string | null;
	refresh_token: string | null;
};
if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', '');
    localStorage.setItem('refresh_token', '');
}

export const AuthContext = createContext<Token>({
	access_token: localStorage.getItem('token'),
	refresh_token: localStorage.getItem('refresh_token'),
});

export const useGlobalContext = () => useContext(AuthContext);
