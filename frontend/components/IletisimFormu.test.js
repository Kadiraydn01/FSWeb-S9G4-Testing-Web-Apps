import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import IletisimFormu from "./IletisimFormu";

test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});
test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const test2 = screen.getByText("İletişim Formu");
  expect(test2).toBeInTheDocument();
});

test("Kullanıcı adını 5 karakterden az girdiğinde bir hata mesajı render ediliyor.", () => {
  render(<IletisimFormu />);
  const test3 = screen.getByLabelText("Ad*");

  fireEvent.change(test3, { target: { value: "John" } });

  const hataMesaji = screen.getByTestId("error-ad");
  expect(hataMesaji).toBeInTheDocument();
  expect(hataMesaji).toHaveTextContent("Hata: ad en az 5 karakter olmalıdır.");
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {});

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

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<IletisimFormu />);

  const test7 = screen.getByLabelText("Soyad*");

  fireEvent.change(test7, { target: { value: "" } });

  fireEvent.click(screen.getByText("Gönder"));
  await waitFor(() => {
    const hataMesaji1 = screen.getByTestId("error-soyad");
    expect(hataMesaji1).toBeInTheDocument();
    expect(hataMesaji1).toHaveTextContent("Hata: soyad gereklidir");
  });
});
test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {});
