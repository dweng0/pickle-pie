import { URL_KEYS } from '../../constants';
export interface Step {
    label: string,
    key: string
}

export const steps: Array<Step> = [
    { label: 'Capacity', key: URL_KEYS.CAPACITY },
    { label: 'On', key: URL_KEYS.START_DATE_TIME },
    { label: 'Start time', key: URL_KEYS.START_TIME },
    { label: 'End time', key: URL_KEYS.END_TIME },
    { label: 'Room', key: URL_KEYS.ROOM }
];