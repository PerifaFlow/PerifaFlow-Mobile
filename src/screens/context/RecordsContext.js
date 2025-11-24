 import { createContext, useContext, useState } from 'react';

const RecordsContext = createContext({
  records: [],
  addRecord: () => {},
  clearRecords: () => {},
});

export function RecordsProvider({ children }) {
  const [records, setRecords] = useState([]);

  function addRecord(data) {
    const newRecord = {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      bairro: data.bairro,
      turno: data.turno, // MANHA | TARDE | NOITE
      energia: data.energia, // 0..2
      ambiente: data.ambiente, // 0..2
      condicao: data.condicao, // 0..2
      nota: data.nota || '',
    };

    setRecords((prev) => [newRecord, ...prev]);
  }

  function clearRecords() {
    setRecords([]);
  }

  return (
    <RecordsContext.Provider value={{ records, addRecord, clearRecords }}>
      {children}
    </RecordsContext.Provider>
  );
}

export function useRecords() {
  return useContext(RecordsContext);
}
