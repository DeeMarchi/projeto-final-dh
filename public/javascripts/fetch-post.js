async function solicitarPost(url, infoBody) {
    if (!url) {
        throw new TypeError('Url não pode estar vazio');
    }
    if (!infoBody) {
        throw new TypeError('Body não pode ser vazio!');
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: infoBody,
    });
    const msg = await res.text();

    return msg;
}
