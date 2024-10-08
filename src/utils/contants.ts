const isProduction = process.env.NODE_ENV === "production";

export const Contants = {
  Server: isProduction ? "/" : "http://localhost:8080/",
};
