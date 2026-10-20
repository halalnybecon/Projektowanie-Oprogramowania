"use strict";
const produkt = [];
let edytowany = null;
const formularz = document.querySelector('#form');
const nazwa = document.querySelector('#name');
const ilosc = document.querySelector('#quantity');
const lista = document.querySelector('#list');
function pokazProdukty() {
    lista.innerHTML = '';
    produkt.forEach(p => {
        const wiersz = lista.insertRow();
        wiersz.insertCell().textContent = p.nazwa;
        wiersz.insertCell().textContent = String(p.ilosc);
        const akcje = wiersz.insertCell();
        const edit = document.createElement('button');
        edit.textContent = 'Edytuj';
        edit.onclick = () => {
            nazwa.value = p.nazwa;
            ilosc.value = String(p.ilosc);
            edytowany = p.id;
        };
        const usun = document.createElement('button');
        usun.textContent = 'Usun';
        usun.onclick = () => {
            produkt.splice(produkt.findIndex(x => x.id === p.id), 1);
            pokazProdukty();
        };
        akcje.append(edit, usun);
    });
}
formularz.onsubmit = e => {
    e.preventDefault();
    const nazw = nazwa.value.trim();
    const ilo = Number(ilosc.value);
    if (!nazw || ilosc.value === '' || ilo < 0)
        return;
    if (edytowany === null)
        produkt.push({ id: Date.now(), nazwa: nazw, ilosc: ilo });
    else {
        const p = produkt.find(x => x.id === edytowany);
        if (p) {
            p.nazwa = nazw;
            p.ilosc = ilo;
        }
    }
    edytowany = null;
    formularz.reset();
    pokazProdukty();
};
