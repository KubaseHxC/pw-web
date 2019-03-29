export const LocalStorageController = {
    save: <T>(entry: string, value: T) => {
        if (localStorage) {
            localStorage.setItem(entry, JSON.stringify(value));
        } else {
            throw new Error(
                'No local storage found, are you running Pizza Web on nodejs? ¬¬'
            );
        }
    },

    get: <T>(entry: string): T | null => {
        if (localStorage) {
            const value: string | null = localStorage.getItem(entry);
            try {
                if (typeof value === 'string') {
                    return JSON.parse(value);
                } else {
                    return value;
                }
            } catch (err) {
                return null;
            }
        } else {
            throw new Error(
                'No local storage found, are you running Pizza Web on nodejs? ¬¬'
            );
        }
    }
};
