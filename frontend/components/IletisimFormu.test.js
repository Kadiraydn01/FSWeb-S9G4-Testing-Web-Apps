import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import IletisimFormu from "./IletisimFormu";
import Goruntule from "./Goruntule";

//1.test yapıldı
test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});

//2.test yapıldı
test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const test2 = screen.getByText("İletişim Formu");
  expect(test2).toBeInTheDocument();
});

//3.test yapıldı
test("Kullanıcı adını 5 karakterden az girdiğinde bir hata mesajı render ediliyor.", () => {
  render(<IletisimFormu />);
  const test3 = screen.getByLabelText("Ad*");

  fireEvent.change(test3, { target: { value: "Ali" } });

  const hataMesaji = screen.getByTestId("error-ad");
  expect(hataMesaji).toBeInTheDocument();
  expect(hataMesaji).toHaveTextContent("Hata: ad en az 5 karakter olmalıdır.");
});

//4.test yapıldı
test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);

  const test4 = screen.getByText("Gönder");
  fireEvent.click(test4);

  const isimHatasi = screen.getByTestId("error-ad");
  expect(isimHatasi).toBeInTheDocument();
  expect(isimHatasi).toHaveTextContent("Hata: ad en az 5 karakter olmalıdır.");

  const soyadHatasi = screen.getByTestId("error-soyad");
  expect(soyadHatasi).toBeInTheDocument();
  expect(soyadHatasi).toHaveTextContent("Hata: soyad gereklidir");

  const mailHatasi = screen.getByTestId("error-mail");
  expect(mailHatasi).toBeInTheDocument();
  expect(mailHatasi).toHaveTextContent(
    "Hata: email geçerli bir email adresi olmalıdır."
  );
});

//5.test yapıldı
test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);

  const ad1 = screen.getByLabelText("Ad*");
  const soyad1 = screen.getByLabelText("Soyad*");

  fireEvent.change(ad1, { target: { value: "Kadir" } });
  fireEvent.change(soyad1, { target: { value: "Aydin" } });

  const test5 = screen.getByText("Gönder");
  fireEvent.click(test5);

  const emailError = screen.getByTestId("error-mail");
  expect(emailError).toBeInTheDocument();
  expect(emailError).toHaveTextContent(
    "Hata: email geçerli bir email adresi olmalıdır."
  );

  const adError = screen.queryByTestId("error-ad");
  const soyadError = screen.queryByTestId("error-soyad");
  expect(adError).toBeNull();
  expect(soyadError).toBeNull();
});

//6. test yapıldı
test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<IletisimFormu />);

  const test6 = screen.getByLabelText("Email*");

  fireEvent.change(test6, { target: { value: "kadiraydn01" } });

  fireEvent.click(screen.getByText("Gönder"));

  await waitFor(() => {
    const hataMesaji2 = screen.getByTestId("error-mail");
    expect(hataMesaji2).toBeInTheDocument();
    expect(hataMesaji2).toHaveTextContent(
      "Hata: email geçerli bir email adresi olmalıdır."
    );
  });
});

//7.test yapıldı
test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<IletisimFormu />);

  const test7 = screen.getByLabelText("Soyad*");

  // Burada fireEvent ile bir simülasyon oluşturuyoruz.
  //Burada change ile öncelikle birşeyleri değiştirmemiz gerektiğini görüyoruz.
  //Sonrasında değişecek değer olarak bilgisini çektiğimiz test7 yi kullanıyoruz.
  //Sonra burada target olarak value değerini alıyoruz ve istediğimiz bir değeri change ediyoruz.
  //Burada Soyad kısmına birşey yazmamasını istediğimiz için boş değer girdik.
  //Böylece simüle ederek test ediyor.
  //Sonrasında yine simüle ederek  "Gönder" butonuna click yapıyor.
  //await waitFor ile hata mesajının dönmesini bekliyoruz ve içine assertlerimizi yazıyoruz.
  fireEvent.change(test7, { target: { value: "" } });

  fireEvent.click(screen.getByText("Gönder"));
  await waitFor(() => {
    const hataMesaji1 = screen.getByTestId("error-soyad");
    expect(hataMesaji1).toBeInTheDocument();
    expect(hataMesaji1).toHaveTextContent("Hata: soyad gereklidir");
  });
});

//8.test yapıldı
test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  render(<IletisimFormu />);
  const test8 = screen.getByText("Gönder");
  fireEvent.click(test8);

  const adBilgi = screen.getByLabelText("Ad*");
  expect(adBilgi).toBeInTheDocument();
  const soyadBilgi = screen.getByLabelText("Soyad*");
  expect(soyadBilgi).toBeInTheDocument();
  const emailBilgi = screen.getByLabelText("Email*");
  expect(emailBilgi).toBeInTheDocument();

  //  query kullanmanın sebebi bir hata mesajı vermediği için
  //  getByTestId ile test başarısız olacakken query ile null döndürüp testi geçmesini sağlıyor.
  const mesajBilgi = screen.queryByTestId("error-mesaj");
  expect(mesajBilgi).toBeNull();
});

//9.test
test("form gönderildiğinde girilen tüm değerler render ediliyor.", () => {
  render(<IletisimFormu />);

  // Ad, soyad, email ve mesajı doldurarak hepsine bir değer atıyorum.
  //Tabi ki hepsi fireEvent ile bir simülasyon gerçekten atanmıyor
  const adDegeri = screen.getByLabelText("Ad*");
  fireEvent.change(adDegeri, { target: { value: "Kadir" } });

  const soyadDegeri = screen.getByLabelText("Soyad*");
  fireEvent.change(soyadDegeri, { target: { value: "Aydin" } });

  const emailDegeri = screen.getByLabelText("Email*");
  fireEvent.change(emailDegeri, { target: { value: "kadir@hotmail.com" } });

  const mesajDegeri = screen.getByLabelText("Mesaj");
  fireEvent.change(mesajDegeri, {
    target: { value: "Bana anlat bana! Millet sana kanalize mi olacak" },
  });

  const test9 = screen.getByText("Gönder");
  fireEvent.click(test9);

  // Tüm girilen değerleri kontrol ederek doğru render edilip edilmediğini kontrol ediyorum.
  const sonAd = screen.getByTestId("firstnameDisplay");
  expect(sonAd).toHaveTextContent("Ad: Kadir");

  const sonSoyad = screen.getByTestId("lastnameDisplay");
  expect(sonSoyad).toHaveTextContent("Soyad: Aydin");

  const sonEmail = screen.getByTestId("emailDisplay");
  expect(sonEmail).toHaveTextContent("Email: kadir@hotmail.com");

  const sonMesaj = screen.getByTestId("messageDisplay");
  expect(sonMesaj).toHaveTextContent(
    "Mesaj: Bana anlat bana! Millet sana kanalize mi olacak"
  );
});
