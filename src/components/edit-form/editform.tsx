import React, { useState, useEffect } from "react";
import * as S from "./styles";
import { Despesa } from "../../pages/Dashboard";
import http from "../../http";

interface EditFormProps {
  despesa: Despesa;
  onClose: () => void;
  onSave: (updatedDespesa: Despesa) => void;
}

const EditForm: React.FC<EditFormProps> = ({ despesa, onClose, onSave }) => {
  const [form, setForm] = useState(despesa);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await http.put(`/despesas/${despesa.id}`, form);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar despesa:", error);
    }
  };

  return (
    <S.FormContainer>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
        />
        <S.Input
          name="categoria"
          placeholder="Categoria"
          value={form.categoria}
          onChange={handleChange}
        />
        <S.Input
          name="valor"
          placeholder="Valor"
          type="number"
          value={form.valor}
          onChange={handleChange}
        />
        <S.Select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="entrada">Entrada</option>
          <option value="saída">Saída</option>
        </S.Select>
        <S.Input
          name="data"
          placeholder="Data"
          type="date"
          value={form.data}
          onChange={handleChange}
        />
        <S.Button type="submit">Salvar</S.Button>
        <S.Button type="button" onClick={onClose}>Cancelar</S.Button>
      </S.Form>
    </S.FormContainer>
  );
};

export default EditForm;