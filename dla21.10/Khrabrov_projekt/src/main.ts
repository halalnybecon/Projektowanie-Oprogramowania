type Produkt = { 
  id: number;
  nazwa: string;
  ilosc: number; 
};

const produkt: Produkt[] = [];
let edytowany: number | null = null;
const formularz = document.querySelector<HTMLFormElement>('#form')!;
const nazwa = document.querySelector<HTMLInputElement>('#name')!;
const ilosc = document.querySelector<HTMLInputElement>('#quantity')!;
const lista = document.querySelector<HTMLTableSectionElement>('#list')!;

function pokazProdukty(): void {
  lista.innerHTML = '';
  produkt.forEach(p => {
    const wiersz = lista.insertRow();
    wiersz.insertCell().textContent = p.nazwa;
    wiersz.insertCell().textContent = String(p.ilosc);
    const insert = wiersz.insertCell();
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
    insert.append(edit, usun);
  });
}

formularz.onsubmit = e => {
  e.preventDefault();
  const nazw = nazwa.value.trim();
  const ilo = Number(ilosc.value);
  if (!nazw || ilosc.value === '' || ilo < 0)
    return;
  if (edytowany === null) produkt.push({
    id: Date.now(),
    nazwa: nazw, 
    ilosc: ilo,
  });
  else {
    const p = produkt.find(x => x.id === edytowany);
    if (p) { 
      p.nazwa = nazw; p.ilosc = ilo; 
    }
  }
  edytowany = null;
  formularz.reset();
  pokazProdukty();
};
