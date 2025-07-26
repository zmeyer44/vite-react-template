import { useState } from "react";
import { z } from "zod";

const API_URL = "https://app.blastoff.org/api/database/[PROJECT_ID]";

type FieldValues = {
  id: string;
  [x: string]: any;
};
export function useStorage<TSchema extends FieldValues>(
  table: string,
  schema: z.Schema<TSchema>
) {
  const [data, setData] = useState<TSchema[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${table}`);
      const data = await response.json();
      const parsedData = z.array(schema).parse(data);
      setData(parsedData);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }
  async function createData(data: Omit<TSchema, "id">) {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${table}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const newData = await response.json();
      const parsedData = schema.parse(newData);
      setData((prev) => [...prev, parsedData]);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }
  async function updateData(id: string, data: TSchema) {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${table}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      const updatedData = await response.json();
      const parsedData = schema.parse(updatedData);
      setData((prev) =>
        prev.map((item) => (item.id === id ? parsedData : item))
      );
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteData(id: string) {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${table}/${id}`, {
        method: "DELETE",
      });
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  return {
    data,
    fetchData,
    createData,
    updateData,
    deleteData,
    isLoading,
    error,
    clearError,
  };
}
