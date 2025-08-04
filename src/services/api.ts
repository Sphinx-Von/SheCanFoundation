const API_BASE_URL = 'http://localhost:3001/api';

export class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async login(email: string, password: string) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  static async signup(name: string, email: string, password: string) {
    return this.request('/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  static async getInternData() {
    return this.request('/intern');
  }

  static async getLeaderboard() {
    return this.request('/leaderboard');
  }
}