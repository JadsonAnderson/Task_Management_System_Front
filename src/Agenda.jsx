// Importa React e Hooks para lidar com estado e efeitos colaterais
import React, { useEffect, useState } from "react";
// Importa um ícone de calendário vazio da biblioteca react-icons (FontAwesome)
import { FaRegCalendarAlt } from "react-icons/fa";

// Array fixo de agendamentos (poderia vir de uma API ou banco de dados)
const agendamentos = [
  {
    hora: "08:00", // Horário do evento
    titulo: "Reunião com a diretoria", // Título da agenda
    status: "Concluído", // Status (Concluído, Orçamento, etc.)
    edicao: "14:29", // Horário da última edição
    anotacoes: "", // Campo para anotações adicionais
  },
  // ... outros itens seguem padrão igual
  {
    hora: "09:00",
    titulo: "Imperial Materiais de Construç",
    status: "Orçamento",
    edicao: "14:05",
    anotacoes: "",
  },
  {
    hora: "10:00",
    titulo: "Ponte dos Ipês",
    status: "Medição",
    edicao: "14:04",
    anotacoes: "",
  },
  {
    hora: "11:00",
    titulo: "Ponte dos Ipês",
    status: "Medição",
    edicao: "14:07",
    anotacoes: "",
  },
  {
    hora: "12:00",
    titulo: "", // Exemplo de horário sem evento
    status: "",
    edicao: "14:04",
    anotacoes: "",
  },
  {
    hora: "13:00",
    titulo: "Ponte do Guaíba",
    status: "Planejamento",
    edicao: "14:30",
    anotacoes: "Início do Planejamento",
  },
  {
    hora: "14:00",
    titulo: "Ponte do Guaíba",
    status: "Planejamento",
    edicao: "14:11",
    anotacoes: "",
  },
  {
    hora: "15:00",
    titulo: "Ponte do Guaíba",
    status: "Reunião",
    edicao: "14:11",
    anotacoes: "",
  },
  {
    hora: "16:00",
    titulo: "Ponte do Guaíba",
    status: "Programação",
    edicao: "14:11",
    anotacoes: "",
  },
];

// Componente funcional principal que renderiza a tela de agendamentos
export default function Agendamento() {
  // Estado para armazenar a data/hora atual que será atualizada em tempo real
  const [horaAtual, setHoraAtual] = useState(new Date());

  // useEffect: executa efeito colateral para atualizar o horário a cada segundo
  useEffect(() => {
    // Define um intervalo que roda a cada 1000ms (1 segundo)
    const interval = setInterval(() => {
      setHoraAtual(new Date()); // Atualiza o estado com nova data/hora
    }, 1000);
    // Cleanup: limpa o intervalo quando o componente desmonta
    return () => clearInterval(interval);
  }, []); // Dependência vazia => executa só na montagem

  // Formata a hora no padrão brasileiro (HH:mm:ss)
  const hora = horaAtual.toLocaleTimeString("pt-BR");
  // Formata a data completa: dia da semana, dia, mês e ano
  const data = horaAtual.toLocaleDateString("pt-BR", {
    weekday: "long", // ex: segunda-feira
    day: "2-digit", // ex: 01, 02, 10
    month: "long", // ex: janeiro, fevereiro
    year: "numeric", // ex: 2025
  });

  return (
    // Container principal: ocupa toda altura, fundo cinza claro e padding
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header: flex container com relógio e ícone */}
      <div className="flex justify-between items-start mb-6">
        {/* Cartão com hora e data */}
        <div className="bg-white shadow-md rounded-xl text-center p-4 w-[280px]">
          {/* Hora atual em fonte monoespaçada e tamanho grande */}
          <div className="text-4xl font-mono mb-2">{hora}</div>
          {/* Data atual em cinza e com todas as palavras capitalizadas */}
          <div className="text-lg text-gray-600 capitalize">{data}</div>
        </div>

        {/* Ícone de calendário: tamanho extra-grande, cor azul e estilo de cartão */}
        <FaRegCalendarAlt className="text-6xl text-blue-600 shadow-md bg-white rounded-lg p-4" />
      </div>

      {/* Seção de Agendamento: título e tabela */}
      <div className="flex flex-col items-start max-w-6xl">
        {/* Título da seção em tamanho 2xl e negrito */}
        {/* Para mover este título horizontalmente:
            - Centralizado: use "mx-auto" ou "text-center w-full"
            - À direita: adicione "ml-auto"
            - À esquerda (padrão): mantenha "items-start" ou use "mr-auto" */}
        <h2 className="text-2xl font-bold mb-4">Agendamento</h2>

        {/* Container da tabela com rolagem e altura máxima */}
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto border rounded-md bg-white shadow-sm w-full">
          <table className="w-full border border-gray-300">
            {/* Cabeçalho fixo no topo ao rolar */}
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr>
                {/* Cabeçalhos de colunas com padding */}
                <th className="border px-4 py-2">Hora</th>
                <th className="border px-4 py-2">Título</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Edição</th>
                <th className="border px-4 py-2">Anotações</th>
              </tr>
            </thead>

            {/* Corpo da tabela: mapeia cada agendamento */}
            <tbody>
              {agendamentos.map((item, index) => (
                <tr
                  key={index}
                  // Aplica cor de fundo alternada para facilitar leitura
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {/* Cada <td> tem borda e padding */}
                  <td className="border px-4 py-2 font-medium">{item.hora}</td>
                  <td className="border px-4 py-2">{item.titulo}</td>
                  <td className="border px-4 py-2">{item.status}</td>
                  <td className="border px-4 py-2">{item.edicao}</td>
                  <td className="border px-4 py-2">{item.anotacoes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
