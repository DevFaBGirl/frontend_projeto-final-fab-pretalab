import { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./styles";
import ChatGemini from "../components/chat-gemini/ChatGemini";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import http from "../http";
import EditForm from "../components/edit-form/editform";
import { FiEdit } from "react-icons/fi";

export type Despesa = {
  id: number;
  descricao: string;
  categoria: string;
  valor: number | string;
  tipo: string;
  data: string;
  user: string;
};

const Dashboard = () => {
  const [despesas, setDespesas] = useState([] as Despesa[]);
  const [user] = useAuthState(auth); 
  const [editingDespesa, setEditingDespesa] = useState<Despesa | null>(null);

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await http.get(`/despesas`); // alteração para buscar direto sem a necessidade do ID
        setDespesas(response.data);
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    };
    fetchDespesas();
  }, [user]);

  const calcularTotais = () => {
    if (despesas.length === 0) {
      return { entradas: 0, saidas: 0, saldo: 0 };
    }

    const entradas = despesas
      .filter((d) => d.tipo === "entrada" && typeof d.valor === "number")
      .reduce((acc, d) => acc + (typeof d.valor === "number" ? d.valor : 0), 0);

    const saidas = despesas
      .filter((d) => d.tipo === "saída" && typeof d.valor === "number")
      .reduce((acc, d) => acc + (typeof d.valor === "number" ? d.valor : 0), 0);

    return { entradas, saidas, saldo: entradas - saidas };
  };

  const { entradas, saidas, saldo } = calcularTotais();

  const handleEditClick = (despesa: Despesa) => {
    setEditingDespesa(despesa);
  };

  const handleSave = async (updatedDespesa: Despesa) => {
    try {
      // Convertendo o valor para número antes de enviar para a API
      const updatedDespesaWithNumber = {
        ...updatedDespesa,
        valor: parseFloat(updatedDespesa.valor as string)
      };

      const response = await http.patch(`/despesas/${updatedDespesa.id}`, updatedDespesaWithNumber);
      const updatedData = response.data;

      setDespesas((prev) =>
        prev.map((d) => (d.id === updatedDespesa.id ? updatedData : d))
      );
      setEditingDespesa(null);
    } catch (error) {
      console.error("Erro ao atualizar despesa:", error);
    }
  };;

  return (
    <S.TableContainer>
      <S.Title>Dashboard de Finanças</S.Title>
      <S.StyledTable>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa) => (
            <tr key={despesa.id}>
              <td>{despesa.descricao}</td>
              <td>{despesa.categoria}</td>
              <td>R$ {typeof despesa.valor === "number" ? despesa.valor.toFixed(2) : "N/A"}</td>
              <td>{despesa.tipo}</td>
              <td>{despesa.data}</td>
              <td>
                <FiEdit onClick={() => handleEditClick(despesa)} />
              </td>
            </tr>
          ))}
        </tbody>
      </S.StyledTable>

      <S.CardsContainer>
        <S.Card $bgColor="#4D3C6E">
          <p>Entradas</p>
          <p>R$ {entradas.toFixed(2)}</p>
        </S.Card>
        <S.Card $bgColor="#D69A6C">
          <p>Saídas</p>
          <p>R$ {saidas.toFixed(2)}</p>
        </S.Card>
        <S.Card $bgColor="#8C7BB6">
          <p>Saldo</p>
          <p>R$ {saldo.toFixed(2)}</p>
        </S.Card>
      </S.CardsContainer>

      {editingDespesa && (
        <EditForm
          despesa={editingDespesa}
          onClose={() => setEditingDespesa(null)}
          onSave={handleSave}
        />
      )}

      <ChatGemini despesas={despesas} />
    </S.TableContainer>
  );
};

export default Dashboard;