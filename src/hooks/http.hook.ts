import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: any = null,
      headers: any = {}
    ) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-type"] = "application/json";
        }
  
        const res = await fetch(url, {
          method,
          body,
          headers,
        });
        const data = await res.json();

        if (data.message === "Неверный логин или пароль") {
          setLoading(false);
          return data.message;
        }

        if (!res.ok) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        setLoading(false);
        return data;
      } catch (e) {
        setError(e.message);
        setLoading(false);
        console.log(e);
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
