"use client";
import styles from "./page.module.css";
import Image from "next/image";

export default function ContatoForm() {
  return (
    <form
      className={styles.contatoForm}
      onSubmit={e => {
        e.preventDefault();
        alert("Mensagem enviada!");
      }}
    >
      <input type="text" name="nome" placeholder="Nome" required />
      <input type="email" name="email" placeholder="E-mail" required />
      <textarea name="mensagem" placeholder="Mensagem" required />
      <button type="submit">Enviar</button>
    </form>
  );
}
