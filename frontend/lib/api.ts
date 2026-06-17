import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const refresh = localStorage.getItem("refresh_token");
      if (refresh) {
        try {
          const { data } = await axios.post(`${API_URL}/auth/refresh`, {
            refresh_token: refresh,
          });
          localStorage.setItem("access_token", data.access_token);
          error.config.headers.Authorization = `Bearer ${data.access_token}`;
          return api(error.config);
        } catch {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/uz/auth/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (data: any) => api.post("/auth/register", data),
  me: () => api.get("/auth/me"),
  refresh: (token: string) =>
    api.post("/auth/refresh", { refresh_token: token }),
};

export const departmentsApi = {
  list: () => api.get("/departments"),
  get: (id: number) => api.get(`/departments/${id}`),
  getBySlug: (slug: string) => api.get(`/departments/by-slug/${slug}`),
  stats: (id: number) => api.get(`/departments/${id}/statistics`),
  resources: (id: number, status?: string) =>
    api.get(`/departments/${id}/resources`, { params: { status } }),
  faculties: () => api.get("/faculties"),
};

export const resourcesApi = {
  list: (params?: any) => api.get("/department-resources", { params }),
  get: (id: number) => api.get(`/department-resources/${id}`),
  upload: (formData: FormData) =>
    api.post("/department-resources", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  submit: (id: number) => api.post(`/department-resources/${id}/submit`),
  approve: (id: number) => api.patch(`/department-resources/${id}/approve`),
  reject: (id: number, reason: string) =>
    api.patch(`/department-resources/${id}/reject`, null, {
      params: { reason },
    }),
  recordView: (id: number) => api.post(`/department-resources/${id}/view`),
  recordDownload: (id: number) =>
    api.post(`/department-resources/${id}/download`),
};

export const booksApi = {
  list: (params?: any) => api.get("/books", { params }),
  get: (id: number) => api.get(`/books/${id}`),
  availability: (id: number) => api.get(`/books/${id}/availability`),
};

export const reservationsApi = {
  create: (data: any) => api.post("/reservations", data),
  my: () => api.get("/reservations/my"),
  all: (status?: string) => api.get("/reservations", { params: { status } }),
  approve: (id: number) => api.patch(`/reservations/${id}/approve`),
  reject: (id: number, reason: string) =>
    api.patch(`/reservations/${id}/reject`, null, { params: { reason } }),
  cancel: (id: number) => api.patch(`/reservations/${id}/cancel`),
  markPickedUp: (id: number) =>
    api.patch(`/reservations/${id}/mark-picked-up`),
};

export const loansApi = {
  my: () => api.get("/loans/my"),
  dueToday: () => api.get("/loans/due-today"),
  overdue: () => api.get("/loans/overdue"),
  issue: (data: any) => api.post("/loans/issue", data),
  return: (id: number) => api.post(`/loans/${id}/return`),
  renew: (id: number, reason?: string, days?: number) =>
    api.post(`/loans/${id}/renew-request`, null, {
      params: { reason, days },
    }),
};

export const readingRoomApi = {
  list: () => api.get("/reading-rooms"),
  seats: (roomId: number, date?: string) =>
    api.get(`/reading-rooms/${roomId}/seats`, { params: { date } }),
  reserve: (data: any) => api.post("/seat-reservations", data),
  my: () => api.get("/seat-reservations/my"),
  checkIn: (id: number) => api.patch(`/seat-reservations/${id}/check-in`),
  cancel: (id: number) => api.patch(`/seat-reservations/${id}/cancel`),
};

export const faceApi = {
  register: (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    return api.post("/face/register", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  verify: (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    return api.post("/face/verify", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  status: () => api.get("/face/status"),
  remove: () => api.delete("/face/remove"),
};

export const aiApi = {
  chat: (message: string, sessionToken?: string, language?: string) =>
    api.post("/ai/chat", { message, session_token: sessionToken, language }),
  search: (query: string, departmentId?: number) =>
    api.post("/ai/search", { query, department_id: departmentId }),
  recommend: (params?: any) => api.post("/ai/recommend", null, { params }),
  citation: (resourceId: number, style?: string) =>
    api.post("/ai/citation", { resource_id: resourceId, style }),
};

export const reportsApi = {
  library: () => api.get("/reports/library"),
  publicStats: () => api.get("/reports/public-stats"),
  users: () => api.get("/reports/users"),
};

export const usersApi = {
  me: () => api.get("/users/me"),
  updateProfile: (data: any) => api.patch("/users/me", data),
  changePassword: (data: any) => api.patch("/users/me/password", data),
  librarySummary: () => api.get("/users/me/library-summary"),
};
