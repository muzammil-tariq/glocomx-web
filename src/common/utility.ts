export const WrpObjectToFormData = (data: any): FormData => {
    let formData = new FormData();
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            formData.append(key, element);
        }
    }

    return formData;
};
