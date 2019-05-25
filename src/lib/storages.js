
import reduxLocalStorage from 'redux-persist/lib/storage';
import createChromeStorage from 'redux-persist-chrome-storage'

import {isRunningChromeExtension} from 'lib/runtime';

export const preferredStorage = isRunningChromeExtension ? createChromeStorage(window.chrome, 'sync') : reduxLocalStorage;
