
export default class ApiClient {
    getEvents() {
        return this.request('http://128.199.53.150/events');
    }

    getEvent(id) {
        return this.request(`http://128.199.53.150/events/${id}`);
    }

    getTrainers(id) {
        return this.request(`http://128.199.53.150/trainers/${id}`);
    }

    request(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onload = function load() {
                if (this.status === 200) {
                    resolve(JSON.parse(this.response));
                } else {
                    const error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = function error() {
                reject(new Error('Error'));
            };

            xhr.send();
        });
    }
}