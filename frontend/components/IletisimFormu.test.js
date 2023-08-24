import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import IletisimFormu from "./IletisimFormu";

test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});
test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const test1 = screen.getByText("İletişim Formu");
  expect(test1).toBeInTheDocument();
});

test("Kullanıcı adını 5 karakterden az girdiğinde bir hata mesajı render ediliyor.", () => {
  render(<IletisimFormu />);
  const test2 = screen.getByLabelText("Ad*");

  fireEvent.change(test2, { target: { value: "John" } });

  const errorElement = screen.getByTestId("error1");
  expect(errorElement).toBeInTheDocument();
  expect(errorElement).toHaveTextContent(
    "Hata: ad en az 5 karakter olmalıdır."
  );
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {});
