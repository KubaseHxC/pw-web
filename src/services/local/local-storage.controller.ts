export class LocalStorageController {
    static entries = {
        Pizza: 'pizza'
    };

    save(entry, value) {
        if (localStorage) {
            localStorage.setItem(entry, JSON.stringify(value));
        } else {
            throw new Error(
                'No local storage found, are you running Pizza Web on nodejs? ¬¬'
            );
        }
    }

    get(entry) {
        if (localStorage) {
            localStorage.getItem(entry);
        } else {
            throw new Error(
                'No local storage found, are you running Pizza Web on nodejs? ¬¬'
            );
        }
    }
}
