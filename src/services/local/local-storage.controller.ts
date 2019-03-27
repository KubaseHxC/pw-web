export class LocalStorageController {
    static entries = {
        Pizza: 'pizza'
    };

    save<T>(entry: string, value: T) {
        if (localStorage) {
            localStorage.setItem(entry, JSON.stringify(value));
        } else {
            throw new Error(
                'No local storage found, are you running Pizza Web on nodejs? ¬¬'
            );
        }
    }

    get<T>(entry: string): T | string | null {
        if (localStorage) {
            const value: string | null = localStorage.getItem(entry);
            try {
                if (typeof value === 'string') {
                    return JSON.parse(value);
                } else {
                    return value;
                }
            } catch (err) {
                return value;
            }
        } else {
            throw new Error(
                'No local storage found, are you running Pizza Web on nodejs? ¬¬'
            );
        }
    }
}
