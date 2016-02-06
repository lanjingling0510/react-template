import makeActionCreator from '../utils/makeActionCreator.js';

/**
 * action types
 */

export const SHOW_MODAL = 'SHOW_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const showModal = makeActionCreator(SHOW_MODAL, 'modal');
export const closeModal = makeActionCreator(CLOSE_MODAL);
