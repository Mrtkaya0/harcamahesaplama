// Htmlden Çekip değişken atadığımız olaylar
const addBtn = document.getElementById('add-btn');
const priceInp = document.getElementById('price-inp');
const titleInp = document.querySelector('#title-inp');
const checkBox = document.querySelector('#checked');
const list = document.querySelector('#list');
const totalSpan = document.querySelector('#price-info');
const select = document.querySelector('select'); // handleFilter fonksiyonunu atamak için
const userInp = document.querySelector('#user-inp')
//! Olay izleyicileri

// 1-ekle butonu olay izleyicisi
addBtn.addEventListener('click', addExpense);
list.addEventListener('click', handleUpdate);
select.addEventListener('change',handleFilter); // handleFilter'ı çağırmak için olay dinleyici ekleyin
userInp.addEventListener('change',saveUser);
document.addEventListener('DOMContentLoaded',getUser)
//! Fonksiyonlarımız

// toplam fiyat bilgisi alanı
let totalPrice = 0; // toplam fiyat bilgimiz sıfırdan başlatıyoruz

//? toplam değişkeni ve arayüzü günceller
// hem değikene hem arayüze tutarı eklicek fonksiyon
function updateTotal(price) {
    totalPrice += price; // sıfırdan başlattığımız fonksiyona price yazcağımız değeri içine atıyoruz
    // html toplam alan bölümü günceller
    totalSpan.innerText = totalPrice;
}
//? yeni harcama ekle butonu fonksiyonu 
function addExpense(event) {
    // aşağıdaki kod sayfa yenilenmeyi engeller
    event.preventDefault();

    // harcama ve fiyat değerlerine erişme ve onları değşkene atam

    const title = titleInp.value; // harcam textin değerine ulaşma
    const price = priceInp.valueAsNumber; // fiyat kısmının number değerine ulaşma

    // harcama (title) ve Fiyat (price) boş ise ekrana uyarı ver
    if (!title || !price) {
        alert('Formu Doldurunuz');
        return;
    }

    // İnputlar doluysa bir html card ve bir Div oluştur
    const expenseDiv = document.createElement("div"); // boş bir div oluşturdk

    //  divin içine alacağımız class cardı oluşturduk
    // class div gelip yukardaki expenseDiv çağırıp add ile ekleme metodunu açağırp ekliyoruz içine

    expenseDiv.classList.add('expense');

    // şimdi html dive gelip  div'i çağırıyoruz inner html ile html kodlarını içine kliyoruz

    if (checkBox.checked === true) {
        expenseDiv.classList.add('paid'); // checbox tiklendiyse paid klası ekle    
    }
    expenseDiv.innerHTML = `
        <h2 id="title">${title}</h2>
        <h2 id="price">${price}</h2>
        <div class="btns">
            <img id="update" src="img/money.png" alt="">
            <img id="delete" src="img/delete.png" alt="">
        </div>
    `;

    // oluşan kartı bir üst kapsayıcısı olan liste gönderip son adımı bitirme

    // list parenten çocuğu addExpense divi ekle
    list.appendChild(expenseDiv);

    // toplam tutarı güncelle
    updateTotal(price);

    // inputların içeriğini silme
    titleInp.value = '';
    priceInp.value = '';
    checkBox.checked = false;
}
//? harcam butonlarını silme fonksiyonu
function handleUpdate(event) {
    // tıklanan eleman
    const ele = event.target;

    // tıklanılan butonun kartına ulaşma (kapsayıcı)
    const parent = ele.parentElement.parentElement;
    // tıklanılan eleman ıd butonu delete ise çalışır 
    if (ele.id === 'delete') {
        // silinen elemanın değerine erişim
        const price = Number(parent.querySelector('#price').innerText);
        // toplam sekmesini güceller
        updateTotal(-price);
        // komple htmlden kaldırma
        parent.remove();
    }
    if (ele.id === 'update') {
        parent.classList.toggle('paid');
    }
}
//? notları fitreleme fonksiyonu
function handleFilter(event) {
    const selected = event.target.value;
    // listedeki elemanlara erişme
    const items = list.childNodes;

    // listedeki her bir eleman için switch ile
    // Yapıcağımız sorguelemanın gözğkğceğin karar vericek
    items.forEach((item) => {
        // seçilen değere göre yapılacak işleme karar verme
        switch (selected) {
            case 'all':
                // clasındaki tüm elemanları göster
                item.style.display = 'flex';
                break;
            case 'paid':
                // listedeki paid elemanları göster
                if (item.classList.contains('paid')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;
            case 'not-paid':
                // Listedekinot-paid elemanları göster
                if (item.classList.contains('paid')) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'flex';
                }
                break;
        }
    });
}

//? Kullanıcıyı kaydeden foknsiyon

function saveUser (event) {
   localStorage.setItem('username',event.target.value);
}

//? Kullanıcıyı lokalden alıp inputa yazmak

function getUser(){
    const username = localStorage.getItem('username') || '';

    userInp.value =username;
}