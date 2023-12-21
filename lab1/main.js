const liczba1 = document.querySelector('#liczba1');
const liczba2 = document.querySelector('#liczba2');
const liczba3 = document.querySelector('#liczba3');
const btnPrzelicz = document.querySelector('#przelicz');
const wynikiPojemnik = document.querySelector('#wyniki');

btnPrzelicz.addEventListener('click', () => {
  const values = [parseFloat(liczba1.value) || 0, parseFloat(liczba2.value) || 0, parseFloat(liczba3.value) || 0];

  const sum = values.reduce((acc, curr) => acc + curr, 0);
  const avg = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  wynikiPojemnik.innerHTML = `Suma: ${sum}, Średnia: ${avg}, Min: ${min}, Max: ${max}`;
});