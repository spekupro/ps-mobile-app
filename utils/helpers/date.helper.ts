import { DateTime } from 'luxon';

export const formatDate = (utcString: string) => {
    return DateTime.fromISO(utcString, { zone: 'utc' })
        .setZone('local')
        .toFormat('MMM d, yyyy H:mm');
};
